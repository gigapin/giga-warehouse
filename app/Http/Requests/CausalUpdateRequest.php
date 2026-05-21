<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CausalUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('causal')->id;

        return [
            'code' => 'required|string|max:20|unique:causals,code,' . $id,
            'description' => 'required|string',
            'typology' => 'required|in:inbound,outbound',
        ];
    }
}
