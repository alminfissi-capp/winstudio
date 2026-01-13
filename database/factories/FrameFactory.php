<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Frame>
 */
class FrameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $width = fake()->numberBetween(800, 2000);
        $height = fake()->numberBetween(1000, 2400);

        return [
            'project_id' => \App\Models\Project::factory(),
            'frame_type' => fake()->randomElement(['1_anta', '2_ante', '3_ante']),
            'opening_type' => fake()->randomElement(['scorrevole', 'battente', 'anta_ribalta']),
            'width' => $width,
            'height' => $height,
            'surface_area' => ($width * $height) / 1_000_000,
            'position_order' => 0,
            'configuration' => null,
        ];
    }
}
