<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'client_name' => fake()->company(),
            'client_address' => fake()->address(),
            'status' => fake()->randomElement(['draft', 'in_progress', 'completed', 'archived']),
        ];
    }

    /**
     * Indicate that the project is in draft status.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }

    /**
     * Indicate that the project has an associated client.
     */
    public function withClient(): static
    {
        return $this->state(fn (array $attributes) => [
            'client_id' => Client::factory()->state(['user_id' => $attributes['user_id']]),
        ]);
    }
}
