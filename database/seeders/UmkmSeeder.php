<?php

namespace Database\Seeders;

use App\Models\Umkm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UmkmSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Umkm::factory(10)->create();
    }
}
