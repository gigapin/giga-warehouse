<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryMovementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                       => $this->id,
            'inventory_movement_type'  => $this->inventory_movement_type,
            'quantity'                 => $this->quantity,
            'reference_ddt'            => $this->reference_ddt,
            'inventory_movement_date'  => $this->inventory_movement_date,
            'purchase_price_cad'       => $this->purchase_price_cad,
            'sale_price_cad'           => $this->sale_price_cad,
            'causal'                   => new CausalResource($this->whenLoaded('causal')),
            'item'                     => new ItemResource($this->whenLoaded('item')),
            'order'                    => new OrderResource($this->whenLoaded('order')),
        ];
    }
}
