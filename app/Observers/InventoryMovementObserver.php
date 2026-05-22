<?php

namespace App\Observers;

use App\Models\InventoryMovement;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;

class InventoryMovementObserver
{
    public function created(InventoryMovement $movement): void
    {
        DB::transaction(function () use ($movement) {
            $this->applyToItem($movement->item_id, $movement->inventory_movement_type, $movement->quantity);
            $this->applyToOrderDetail($movement->detail_order_id, $movement->quantity);
            $this->syncOrderStatus($movement->detail_order_id);
        });
    }

    public function updated(InventoryMovement $movement): void
    {
        DB::transaction(function () use ($movement) {
            $oldItemId        = $movement->getOriginal('item_id');
            $oldType          = $movement->getOriginal('inventory_movement_type');
            $oldQuantity      = $movement->getOriginal('quantity');
            $oldDetailOrderId = $movement->getOriginal('detail_order_id');

            $reverseType = $oldType === 'inbound' ? 'outbound' : 'inbound';
            $this->applyToItem($oldItemId, $reverseType, $oldQuantity);
            $this->reverseFromOrderDetail($oldDetailOrderId, $oldQuantity);

            $this->applyToItem($movement->item_id, $movement->inventory_movement_type, $movement->quantity);
            $this->applyToOrderDetail($movement->detail_order_id, $movement->quantity);

            $this->syncOrderStatus($oldDetailOrderId);
            $this->syncOrderStatus($movement->detail_order_id);
        });
    }

    public function deleted(InventoryMovement $movement): void
    {
        DB::transaction(function () use ($movement) {
            $reverseType = $movement->inventory_movement_type === 'inbound' ? 'outbound' : 'inbound';
            $this->applyToItem($movement->item_id, $reverseType, $movement->quantity);
            $this->reverseFromOrderDetail($movement->detail_order_id, $movement->quantity);
            $this->syncOrderStatus($movement->detail_order_id);
        });
    }

    private function applyToItem(int $itemId, string $type, int $quantity): void
    {
        $item = Item::lockForUpdate()->findOrFail($itemId);

        if ($type === 'inbound') {
            $item->progressive_annual_inbound += $quantity;
        } else {
            $item->progressive_annual_outbound += $quantity;
        }

        $item->available_stock =
            $item->stock_beginning_year
            + $item->progressive_annual_inbound
            - $item->progressive_annual_outbound;

        $item->save();
    }

    private function applyToOrderDetail(int $detailOrderId, int $quantity): void
    {
        $detail = OrderDetail::lockForUpdate()->findOrFail($detailOrderId);
        $detail->qta_delivered += $quantity;
        $detail->delivered = $detail->qta_delivered >= $detail->qta_ordered;
        $detail->save();
    }

    private function reverseFromOrderDetail(int $detailOrderId, int $quantity): void
    {
        $detail = OrderDetail::lockForUpdate()->findOrFail($detailOrderId);
        $detail->qta_delivered = max(0, $detail->qta_delivered - $quantity);
        $detail->delivered = $detail->qta_delivered >= $detail->qta_ordered;
        $detail->save();
    }

    private function syncOrderStatus(int $detailOrderId): void
    {
        $orderId = OrderDetail::where('id', $detailOrderId)->value('order_id');
        if (!$orderId) return;

        $order = Order::lockForUpdate()->findOrFail($orderId);
        $allDelivered = !$order->details()->where('delivered', false)->exists();

        if ($allDelivered) {
            $order->status = 'close';
            $order->closing_date = today();
        } else {
            $order->status = 'open';
            $order->closing_date = null;
        }

        $order->save();
    }
}
