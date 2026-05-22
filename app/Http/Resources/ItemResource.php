<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                          => $this->id,
            'name'                        => $this->name,
            'description'                 => $this->description,
            'stock_beginning_year'        => $this->stock_beginning_year,
            'progressive_annual_inbound'  => $this->progressive_annual_inbound,
            'progressive_annual_outbound' => $this->progressive_annual_outbound,
            'safety_stock'                => $this->safety_stock,
            'available_stock'             => $this->available_stock,
            'category'                    => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
