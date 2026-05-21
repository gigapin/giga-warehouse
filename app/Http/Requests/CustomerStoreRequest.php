<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_name' => 'required|string|max:100',
            'vat_number' => 'required|string|max:11|unique:customers',
            'fiscal_code' => 'required|string|max:16|unique:customers',
            'municipality_id' => 'required|exists:municipalities,id',
            'address' => 'required|string',
            'sdi_code' => 'nullable|string|max:10',
            'pec' => 'nullable|string|max:50',
            'email' => 'required|email|max:50|unique:customers',
            'phone' => 'required|string|max:50|unique:customers',
        ];
    }
}
