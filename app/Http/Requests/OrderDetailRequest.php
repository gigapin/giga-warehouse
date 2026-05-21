<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderDetailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'order_id' => 'required|exists:orders,id',
            'item_id' => 'required|exists:items,id',
            'delivery_date' => 'required|date',
            'qta_ordered' => 'required|integer|min:0',
            'qta_delivered' => 'integer|min:0',
            'delivered' => 'boolean',
            'note' => 'nullable|string',
        ];
    }
}
