<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryMovementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'causal_id' => 'required|exists:causals,id',
            'item_id' => 'required|exists:items,id',
            'inventory_movement_type' => 'required|in:inbound,outbound',
            'parent_id' => 'nullable|exists:inventory_movements,id',
            'order_id' => 'nullable|exists:orders,id',
            'detail_order_id' => 'required|exists:order_details,id',
            'quantity' => 'required|integer',
            'reference_ddt' => 'nullable|string',
            'inventory_movement_date' => 'required|date',
            'purchase_price_cad' => 'numeric|min:0',
            'sale_price_cad' => 'numeric|min:0',
        ];
    }
}
