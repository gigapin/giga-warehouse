<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CausalStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:20|unique:causals',
            'description' => 'required|string',
            'typology' => 'required|in:inbound,outbound',
        ];
    }
}
