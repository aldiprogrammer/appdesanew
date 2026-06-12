<?php

namespace Database\Seeders;

use App\Models\Dusun;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DusunSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Dusun::create([
            'nama_dusun' => 'Dusun I Tanjung Putus',
            'latitude' => '3.82210',
            'longitude' => '98.21450',
            'polygon' => null,
            'luas_wilayah' => 325.50,
            'status' => 1,
        ]);

        Dusun::create([
            'nama_dusun' => 'Dusun II Tanjung Putus',
            'latitude' => '3.81980',
            'longitude' => '98.21720',
            'polygon' => null,
            'luas_wilayah' => 298.75,
            'status' => 1,
        ]);

        Dusun::create([
            'nama_dusun' => 'Dusun III Tanjung Putus',
            'latitude' => '3.82150',
            'longitude' => '98.21300',
            'polygon' => null,
            'luas_wilayah' => 412.30,
            'status' => 1,
        ]);

        Dusun::create([
            'nama_dusun' => 'Dusun IV Tanjung Putus',
            'latitude' => '3.82010',
            'longitude' => '98.21680',
            'polygon' => null,
            'luas_wilayah' => 280.45,
            'status' => 1,
        ]);
    }
}
