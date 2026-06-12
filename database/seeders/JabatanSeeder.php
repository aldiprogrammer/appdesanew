<?php

namespace Database\Seeders;

use App\Models\Jabatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JabatanSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $jabatan = [
            'Kepala Desa',
            'Sekretaris Desa',
            'Kaur Keuangan',
            'Kaur Umum dan Perencanaan',
            'Kasi Pelayanan',
            'Kasi Pemerintahan',
            'Kasi Kesejahteraan',
            'Staff Desa',
        ];

        foreach ($jabatan as $j) {
            Jabatan::create(['jabatan' => $j]);
        }
    }
}
