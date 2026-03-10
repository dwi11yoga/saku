<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()->dateTimeThisMonth(now());
        return [
            'user_id' => 1,
            'wallet_id' => fake()->numberBetween(1, 3),
            'category_id' => fake()->numberBetween(1, 3),
            'date' => $date,
            'amount' => fake()->numberBetween(5000, 100000),
            'direction' => fake()->randomElement(['in', 'out']),
            'note' => fake()->sentence(10),
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
