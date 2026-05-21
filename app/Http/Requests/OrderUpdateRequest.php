<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('order')->id;

        return [
            'typology' => 'required|in:customer,supplier',
            'customer_id' => 'nullable|exists:customers,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'order_number' => 'required|string|max:15|unique:orders,order_number,' . $id,
            'request_date' => 'required|date',
            'closing_date' => 'nullable|date',
            'status' => 'required|in:open,close',
            'note' => 'nullable|string',
        ];
    }
}
