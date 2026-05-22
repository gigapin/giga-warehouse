<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'typology'     => $this->typology,
            'order_number' => $this->order_number,
            'request_date' => $this->request_date,
            'closing_date' => $this->closing_date,
            'status'       => $this->status,
            'note'         => $this->note,
            'customer'     => new CustomerResource($this->whenLoaded('customer')),
            'supplier'     => new SupplierResource($this->whenLoaded('supplier')),
            'details'      => OrderDetailResource::collection($this->whenLoaded('details')),
        ];
    }
}
