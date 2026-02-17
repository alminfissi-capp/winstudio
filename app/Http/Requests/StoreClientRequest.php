<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
            'nome' => ['nullable', 'string', 'max:100'],
            'cognome' => ['nullable', 'string', 'max:100'],
            'ragione_sociale' => ['nullable', 'string', 'max:255'],
            'indirizzo_via' => ['nullable', 'string', 'max:255'],
            'indirizzo_citta' => ['nullable', 'string', 'max:100'],
            'indirizzo_cap' => ['nullable', 'string', 'max:10'],
            'indirizzo_provincia' => ['nullable', 'string', 'max:5'],
            'telefono' => ['nullable', 'string', 'max:30'],
            'cellulare' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'pec' => ['nullable', 'email', 'max:255'],
            'codice_fiscale' => ['nullable', 'string', 'max:16'],
            'partita_iva' => ['nullable', 'string', 'max:13'],
            'note' => ['nullable', 'string'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(\Illuminate\Validation\Validator $validator): void
    {
        $validator->after(function (\Illuminate\Validation\Validator $validator) {
            $hasName = $this->filled('nome') || $this->filled('cognome');
            $hasRagioneSociale = $this->filled('ragione_sociale');

            if (! $hasName && ! $hasRagioneSociale) {
                $validator->errors()->add(
                    'nome',
                    'Inserire almeno nome/cognome oppure ragione sociale.'
                );
            }
        });
    }
}
