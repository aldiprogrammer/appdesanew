<?php

namespace Database\Factories;

use App\Models\Umkm;
use Illuminate\Database\Eloquent\Factories\Factory;

class UmkmFactory extends Factory
{
    protected $model = Umkm::class;

    public function definition(): array
    {
        return [
            'nama_usaha' => fake()->company(),
            'alamat' => fake()->address(),
            'keterangan' => fake()->sentence(10),
            'nohp' => '08' . fake()->numerify('##########'),
            'foto1' => null,
            'foto2' => null,
            'foto3' => null,
        ];
    }
}
