<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MunicipalityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50',
            'postal_code' => 'required|string|max:5',
            'district' => 'required|string|max:2',
            'region' => 'required|string|max:50',
        ];
    }
}
