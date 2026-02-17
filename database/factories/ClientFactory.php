<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'nome' => fake()->firstName(),
            'cognome' => fake()->lastName(),
            'indirizzo_via' => fake()->streetAddress(),
            'indirizzo_citta' => fake()->city(),
            'indirizzo_cap' => fake()->postcode(),
            'indirizzo_provincia' => fake()->stateAbbr(),
            'telefono' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
        ];
    }

    /**
     * Indicate a business client with ragione_sociale.
     */
    public function azienda(): static
    {
        return $this->state(fn (array $attributes) => [
            'ragione_sociale' => fake()->company(),
            'partita_iva' => fake()->numerify('###########'),
        ]);
    }
}
