<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'typology' => 'required|in:customer,supplier',
            'customer_id' => 'required_if:typology,customer|prohibited_if:typology,supplier|exists:customers,id|nullable',
            'supplier_id' => 'required_if:typology,supplier|prohibited_if:typology,customer|exists:suppliers,id|nullable',
            'order_number' => 'required|string|max:15|unique:orders',
            'request_date' => 'required|date',
            'closing_date' => 'nullable|date',
            'status' => 'required|in:open,close',
            'note' => 'nullable|string',
        ];
    }
}
