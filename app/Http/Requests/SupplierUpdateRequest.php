<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('supplier')->id;

        return [
            'company_name' => 'required|string|max:100',
            'vat_number' => 'required|string|max:11|unique:suppliers,vat_number,' . $id,
            'fiscal_code' => 'required|string|max:16|unique:suppliers,fiscal_code,' . $id,
            'municipality_id' => 'required|exists:municipalities,id',
            'address' => 'required|string',
            'sdi_code' => 'nullable|string|max:10',
            'pec' => 'nullable|string|max:50',
            'email' => 'required|email|max:50|unique:suppliers,email,' . $id,
            'phone' => 'required|string|max:50|unique:suppliers,phone,' . $id,
            'service' => 'nullable|integer|min:0|max:255',
            'punctuality' => 'nullable|integer|min:0|max:255',
            'quality' => 'nullable|integer|min:0|max:255',
            'prices' => 'nullable|integer|min:0|max:255',
            'assistance' => 'nullable|integer|min:0|max:255',
        ];
    }
}
