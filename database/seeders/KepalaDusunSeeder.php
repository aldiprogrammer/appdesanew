<?php

namespace Database\Seeders;

use App\Models\Kepaladusun;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KepalaDusunSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Kepaladusun::create([
            'nama' => 'Ahmad Syahputra',
            'nik' => '1205212005001001',
            'foto' => 'https://placehold.co/200x200/emerald/white?text=Kadus+I',
            'dusun' => 'Dusun I Tanjung Putus',
            'id_dusun' => '1',
            'tahun_kerja' => '2022',
            'tahun_akhir_kerja' => '2027',
        ]);

        Kepaladusun::create([
            'nama' => 'Muhammad Rizki',
            'nik' => '1205212005001002',
            'foto' => 'https://placehold.co/200x200/emerald/white?text=Kadus+II',
            'dusun' => 'Dusun II Tanjung Putus',
            'id_dusun' => '2',
            'tahun_kerja' => '2021',
            'tahun_akhir_kerja' => '2026',
        ]);

        Kepaladusun::create([
            'nama' => 'Siti Rahmawati',
            'nik' => '1205212005001003',
            'foto' => 'https://placehold.co/200x200/emerald/white?text=Kadus+III',
            'dusun' => 'Dusun III Tanjung Putus',
            'id_dusun' => '3',
            'tahun_kerja' => '2023',
            'tahun_akhir_kerja' => '2028',
        ]);

        Kepaladusun::create([
            'nama' => 'Joko Susilo',
            'nik' => '1205212005001004',
            'foto' => 'https://placehold.co/200x200/emerald/white?text=Kadus+IV',
            'dusun' => 'Dusun IV Tanjung Putus',
            'id_dusun' => '4',
            'tahun_kerja' => '2020',
            'tahun_akhir_kerja' => '2025',
        ]);
    }
}
