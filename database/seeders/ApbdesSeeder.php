<?php

namespace Database\Seeders;

use App\Models\Apbdes;
use App\Models\ApbdesBelanja;
use App\Models\ApbdesPendapatan;
use Illuminate\Database\Seeder;

class ApbdesSeeder extends Seeder
{
    public function run(): void
    {
        $anggaran = Apbdes::create([
            'tahun' => 2025,
            'total_pendapatan' => 1_850_000_000,
            'total_belanja' => 1_750_000_000,
            'keterangan' => 'APBDes Tahun Anggaran 2025',
            'status' => 'realisasi',
        ]);

        $pendapatans = [
            ['sumber_pendapatan' => 'Dana Desa (DD)', 'jumlah' => 850_000_000, 'keterangan' => 'DD dari APBN'],
            ['sumber_pendapatan' => 'Alokasi Dana Desa (ADD)', 'jumlah' => 400_000_000, 'keterangan' => 'ADD dari APBD Kabupaten'],
            ['sumber_pendapatan' => 'Pajak Desa', 'jumlah' => 85_000_000, 'keterangan' => 'Pajak Bumi dan Bangunan'],
            ['sumber_pendapatan' => 'BUMDes', 'jumlah' => 265_000_000, 'keterangan' => 'Hasil usaha BUMDes'],
            ['sumber_pendapatan' => 'Hasil Kekayaan Desa', 'jumlah' => 120_000_000, 'keterangan' => 'Tanah kas desa dan sebagainya'],
            ['sumber_pendapatan' => 'Lain-lain Pendapatan', 'jumlah' => 130_000_000, 'keterangan' => 'Hibah, bantuan, dan lain-lain'],
        ];

        $belanjas = [
            ['kegiatan' => 'Pembangunan Jalan Desa', 'kategori' => 'Pembangunan', 'jumlah' => 350_000_000, 'lokasi' => 'RW 01 - RW 04', 'keterangan' => 'Hotmix sepanjang 2 km'],
            ['kegiatan' => 'Gaji Perangkat Desa', 'kategori' => 'Operasional', 'jumlah' => 420_000_000, 'lokasi' => '-', 'keterangan' => '12 perangkat desa'],
            ['kegiatan' => 'Operasional Posyandu', 'kategori' => 'Pemberdayaan', 'jumlah' => 95_000_000, 'lokasi' => '6 posyandu', 'keterangan' => 'Vitamin, PMT, alat kesehatan'],
            ['kegiatan' => 'Pembangunan Drainase', 'kategori' => 'Pembangunan', 'jumlah' => 180_000_000, 'lokasi' => 'Dusun Krajan', 'keterangan' => 'Saluran air 1.2 km'],
            ['kegiatan' => 'Bantuan Langsung Tunai (BLT)', 'kategori' => 'Sosial', 'jumlah' => 300_000_000, 'lokasi' => '50 KPM', 'keterangan' => 'BLT DD untuk 50 keluarga'],
            ['kegiatan' => 'Kegiatan PKK & Karang Taruna', 'kategori' => 'Pemberdayaan', 'jumlah' => 75_000_000, 'lokasi' => 'Balai Desa', 'keterangan' => 'Pelatihan dan lomba'],
            ['kegiatan' => 'Penyediaan Air Bersih', 'kategori' => 'Pembangunan', 'jumlah' => 120_000_000, 'lokasi' => 'Dusun Cikadu', 'keterangan' => 'Sumur bor + pipanisasi'],
            ['kegiatan' => 'Operasional Kantor Desa', 'kategori' => 'Operasional', 'jumlah' => 210_000_000, 'lokasi' => 'Kantor Desa', 'keterangan' => 'ATK, listrik, internet, perawatan'],
        ];

        foreach ($pendapatans as $p) {
            $anggaran->pendapatans()->create($p);
        }

        foreach ($belanjas as $b) {
            $anggaran->belanjas()->create($b);
        }
    }
}
