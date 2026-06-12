<?php

namespace Database\Seeders;

use App\Models\Dusun;
use App\Models\KategoriBantuan;
use App\Models\PenerimaBantuan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenerimaBantuanSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $dusunIds = Dusun::pluck('id')->toArray();
        $kategoriIds = KategoriBantuan::pluck('id')->toArray();

        if (empty($dusunIds) || empty($kategoriIds)) {
            $this->command->warn('Dusun atau Kategori Bantuan belum ada. Jalankan seeders terkait terlebih dahulu.');
            return;
        }

        $data = [
            ['nik' => '1201010101990001', 'nama' => 'Slamet Riyadi',       'dusun_index' => 0, 'kategori_index' => 0, 'keterangan' => 'Layak menerima BPNT'],
            ['nik' => '1201010101990002', 'nama' => 'Kartini',             'dusun_index' => 0, 'kategori_index' => 1, 'keterangan' => 'Ibu hamil, peserta PKH'],
            ['nik' => '1201010101990003', 'nama' => 'Suparman',            'dusun_index' => 1, 'kategori_index' => 2, 'keterangan' => 'Kehilangan pekerjaan'],
            ['nik' => '1201010101990004', 'nama' => 'Juminten',            'dusun_index' => 1, 'kategori_index' => 3, 'keterangan' => 'Anak stunting usia 2 tahun'],
            ['nik' => '1201010101990005', 'nama' => 'Agus Salim',          'dusun_index' => 2, 'kategori_index' => 4, 'keterangan' => 'UMKM kuliner'],
            ['nik' => '1201010101990006', 'nama' => 'Siti Aisyah',         'dusun_index' => 2, 'kategori_index' => 0, 'keterangan' => null],
            ['nik' => '1201010101990007', 'nama' => 'Budi Santoso',        'dusun_index' => 3, 'kategori_index' => 5, 'keterangan' => 'Anak SD kelas 4'],
            ['nik' => '1201010101990008', 'nama' => 'Sari Dewi',           'dusun_index' => 3, 'kategori_index' => 6, 'keterangan' => 'Penyakit kronis'],
            ['nik' => '1201010101990009', 'nama' => 'Herman Susilo',       'dusun_index' => 0, 'kategori_index' => 7, 'keterangan' => 'Rumah tidak layak huni'],
            ['nik' => '1201010101990010', 'nama' => 'Rina Marlina',        'dusun_index' => 1, 'kategori_index' => 1, 'keterangan' => 'Peserta PKH anak sekolah'],
            ['nik' => '1201010101990011', 'nama' => 'Tumijo',              'dusun_index' => 2, 'kategori_index' => 2, 'keterangan' => 'Lansia tidak mampu'],
            ['nik' => '1201010101990012', 'nama' => 'Wahyuningsih',        'dusun_index' => 3, 'kategori_index' => 3, 'keterangan' => 'Balita stunting'],
        ];

        foreach ($data as $item) {
            PenerimaBantuan::create([
                'nik' => $item['nik'],
                'nama' => $item['nama'],
                'dusun_id' => $dusunIds[$item['dusun_index']],
                'kategori_bantuan_id' => $kategoriIds[$item['kategori_index']],
                'keterangan' => $item['keterangan'],
            ]);
        }
    }
}
