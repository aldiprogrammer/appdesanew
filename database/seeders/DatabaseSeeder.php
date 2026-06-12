<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\UmkmSeeder;
use Database\Seeders\KontakLayananSeeder;
use Database\Seeders\JabatanSeeder;
use Database\Seeders\PegawaiSeeder;
use Database\Seeders\ProfilDesaSeeder;
use Database\Seeders\BeritaSeeder;
use Database\Seeders\DusunSeeder;
use Database\Seeders\KategoriBantuanSeeder;
use Database\Seeders\KepalaDusunSeeder;
use Database\Seeders\PenerimaBantuanSeeder;
use Database\Seeders\PengaduanSeeder;
use Database\Seeders\StantingSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            AdminSeeder::class,
            UmkmSeeder::class,
            KontakLayananSeeder::class,
            JabatanSeeder::class,
            PegawaiSeeder::class,
            ProfilDesaSeeder::class,
            BeritaSeeder::class,
            DusunSeeder::class,
            KepalaDusunSeeder::class,
            KategoriBantuanSeeder::class,
            PenerimaBantuanSeeder::class,
            StantingSeeder::class,
            PengaduanSeeder::class,
        ]);
    }
}
}
