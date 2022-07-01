<?php

namespace Database\Factories;

use App\Models\UserData;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order> 
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'order_number' => $this->faker->word(),
            'price_total' => $this->faker->randomFloat(2, 5, 100),
            'item_count' => $this->faker->randomDigitNotZero(),
            'user_data_id' => UserData::factory(),
        ];
    }
}
