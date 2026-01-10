<?php

namespace Database\Factories;

use App\Models\Camera;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rentDays = rand(1, 7);
        $camera = Camera::inRandomOrder()->first();
        $pickupDate = fake()->date('Y-m-d H:i:s', 'now');
        $dropoffDate = Carbon::parse($pickupDate)->addDays($rentDays)->format('Y-m-d H:i:s');

        return [
            'name' => fake()->name(),
            'mobile_number' => fake()->phoneNumber(),
            'camera_id' => $camera->id,
            'cost' => $camera->price,
            'pickup_date' => $pickupDate,
            'dropoff_date' => $dropoffDate,
            'rent_days' => $rentDays,
            'social_media_url' => fake()->url(),
            'ecp' => fake()->name(),
            'ecp_mobile_number' => fake()->phoneNumber(),
        ];
    }
}
