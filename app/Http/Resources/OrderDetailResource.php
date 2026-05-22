<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'order_id'      => $this->order_id,
            'delivery_date' => $this->delivery_date,
            'qta_ordered'   => $this->qta_ordered,
            'qta_delivered' => $this->qta_delivered,
            'delivered'     => (bool) $this->delivered,
            'note'          => $this->note,
            'order'         => new OrderResource($this->whenLoaded('order')),
            'item'          => new ItemResource($this->whenLoaded('item')),
        ];
    }
}
