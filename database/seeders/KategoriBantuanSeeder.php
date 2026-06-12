<?php

namespace Database\Seeders;

use App\Models\KategoriBantuan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriBantuanSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $items = [
            'Bantuan Pangan Non Tunai (BPNT)',
            'Program Keluarga Harapan (PKH)',
            'Bantuan Langsung Tunai (BLT)',
            'Bantuan Stunting',
            'Bantuan Modal Usaha',
            'Bantuan Pendidikan',
            'Bantuan Kesehatan',
            'Bantuan Rumah Layak Huni',
        ];

        foreach ($items as $nama) {
            KategoriBantuan::create(['nama_bantuan' => $nama]);
        }
    }
}
