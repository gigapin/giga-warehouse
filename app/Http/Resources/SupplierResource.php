<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'company_name' => $this->company_name,
            'vat_number'   => $this->vat_number,
            'fiscal_code'  => $this->fiscal_code,
            'address'      => $this->address,
            'sdi_code'     => $this->sdi_code,
            'pec'          => $this->pec,
            'email'        => $this->email,
            'phone'        => $this->phone,
            'service'      => $this->service,
            'punctuality'  => $this->punctuality,
            'quality'      => $this->quality,
            'prices'       => $this->prices,
            'assistance'   => $this->assistance,
            'municipality' => new MunicipalityResource($this->whenLoaded('municipality')),
        ];
    }
}
