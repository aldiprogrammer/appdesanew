<?php

namespace Database\Seeders;

use App\Models\Jabatan;
use App\Models\Pegawai;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PegawaiSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $ids = Jabatan::pluck('id')->toArray();

        if (empty($ids)) {
            $this->command->warn('Jabatan belum ada. Jalankan JabatanSeeder terlebih dahulu.');
            return;
        }

        Pegawai::factory(8)->sequence(
            ['nama' => 'Bambang Supriyadi', 'id_jabatan' => $ids[0]],
            ['nama' => 'Dewi Sartika',     'id_jabatan' => $ids[1]],
            ['nama' => 'Rina Jayanti',     'id_jabatan' => $ids[2]],
            ['nama' => 'Alfiah Ramadhani', 'id_jabatan' => $ids[3]],
            ['nama' => 'Marliana',         'id_jabatan' => $ids[4]],
            ['nama' => 'Safitriyani',      'id_jabatan' => $ids[5]],
            ['nama' => 'Hendra Gunawan',   'id_jabatan' => $ids[6]],
            ['nama' => 'Sumarni',          'id_jabatan' => $ids[7]],
        )->create();
    }
}
