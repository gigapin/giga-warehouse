<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50|unique:items',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'stock_beginning_year' => 'integer|min:0',
            'progressive_annual_inbound' => 'integer|min:0',
            'progressive_annual_outbound' => 'integer|min:0',
            'safety_stock' => 'integer|min:0',
            'available_stock' => 'integer|min:0',
        ];
    }
}
