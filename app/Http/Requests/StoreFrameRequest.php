<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFrameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'frame_type' => ['required', 'string', 'max:50'],
            'opening_type' => ['nullable', 'string', 'max:50'],
            'width' => ['nullable', 'integer', 'min:100', 'max:10000'],
            'height' => ['nullable', 'integer', 'min:100', 'max:10000'],
            'configuration' => ['nullable', 'array'],
        ];
    }
}
