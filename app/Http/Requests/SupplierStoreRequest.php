<?php

namespace App\Http\Requests;

use App\Rules\ItalianFiscalCode;
use App\Rules\ItalianVatNumber;
use Illuminate\Foundation\Http\FormRequest;

class SupplierStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_name' => 'required|string|max:100',
            'vat_number' => ['required', 'string', new ItalianVatNumber, 'unique:suppliers'],
            'fiscal_code' => ['required', 'string', new ItalianFiscalCode, 'unique:suppliers'],
            'municipality_id' => 'required|exists:municipalities,id',
            'address' => 'required|string',
            'sdi_code' => 'nullable|string|max:10',
            'pec' => 'nullable|string|max:50',
            'email' => 'required|email|max:50|unique:suppliers',
            'phone' => 'required|string|max:50|unique:suppliers',
            'service' => 'nullable|integer|min:0|max:255',
            'punctuality' => 'nullable|integer|min:0|max:255',
            'quality' => 'nullable|integer|min:0|max:255',
            'prices' => 'nullable|integer|min:0|max:255',
            'assistance' => 'nullable|integer|min:0|max:255',
        ];
    }
}
