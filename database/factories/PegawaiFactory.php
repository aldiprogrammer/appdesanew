<?php

namespace Database\Factories;

use App\Models\Pegawai;
use Illuminate\Database\Eloquent\Factories\Factory;

class PegawaiFactory extends Factory
{
    protected $model = Pegawai::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'nik' => fake()->numerify('################'),
            'nip' => fake()->numerify('##################'),
            'nohp' => '08' . fake()->numerify('##########'),
            'alamat' => fake()->address(),
            'foto' => null,
        ];
    }
}
