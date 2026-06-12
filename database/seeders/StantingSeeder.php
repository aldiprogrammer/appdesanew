<?php

namespace Database\Seeders;

use App\Models\Dusun;
use App\Models\Stanting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StantingSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $dusunIds = Dusun::pluck('id')->toArray();

        if (empty($dusunIds)) {
            $this->command->warn('Dusun belum ada. Jalankan DusunSeeder terlebih dahulu.');
            return;
        }

        $data = [
            ['nik' => '1201010101990101', 'nama' => 'Ani Rahmawati',     'dusun_index' => 0],
            ['nik' => '1201010101990102', 'nama' => 'Bambang Tri',        'dusun_index' => 0],
            ['nik' => '1201010101990103', 'nama' => 'Citra Lestari',      'dusun_index' => 1],
            ['nik' => '1201010101990104', 'nama' => 'Doni Prasetyo',      'dusun_index' => 1],
            ['nik' => '1201010101990105', 'nama' => 'Eka Fitriani',       'dusun_index' => 1],
            ['nik' => '1201010101990106', 'nama' => 'Fajar Hidayat',      'dusun_index' => 2],
            ['nik' => '1201010101990107', 'nama' => 'Gita Permata',       'dusun_index' => 2],
            ['nik' => '1201010101990108', 'nama' => 'Hendra Saputra',     'dusun_index' => 3],
            ['nik' => '1201010101990109', 'nama' => 'Indah Wulandari',    'dusun_index' => 3],
            ['nik' => '1201010101990110', 'nama' => 'Joko Susilo',        'dusun_index' => 3],
        ];

        foreach ($data as $item) {
            Stanting::create([
                'nik' => $item['nik'],
                'nama' => $item['nama'],
                'dusun_id' => $dusunIds[$item['dusun_index']],
            ]);
        }
    }
}
