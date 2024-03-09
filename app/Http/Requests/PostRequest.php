<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
        $rules = [
            'title' => 'required|max:255',
            'category' => 'required|max:255',
            'publication_date' => 'required|date',
            'description' => 'required',
            'image' => 'image|max:2048|mimes:jpg,png'
        ];

        // Image is required ONLY on creation
        if ($this->getMethod() == 'POST') {
            $rules['image'] = 'required|' . $rules['image'];
        }

        return $rules;
    }
}
