<?php

namespace Database\Seeders;

use App\Models\Pengaduan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PengaduanSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $userIds = User::pluck('id')->toArray();

        if (empty($userIds)) {
            $this->command->warn('User belum ada. Jalankan DatabaseSeeder terlebih dahulu.');
            return;
        }

        $data = [
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Infrastruktur Jalan',  'keterangan' => 'Jalan rusak di Dusun I sudah 2 tahun tidak diperbaiki, warga kesulitan mengangkut hasil pertanian.',                              'status' => 'diproses'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Layanan Administrasi', 'keterangan' => 'Proses pembuatan KTP di kantor desa terlalu lama, bisa memakan waktu berminggu-minggu.',                                  'status' => 'pending'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Lingkungan',           'keterangan' => 'Banyak warga yang membuang sampah di sungai, menyebabkan bau tidak sedap dan banjir saat hujan.',                          'status' => 'selesai'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Penerangan Jalan',     'keterangan' => 'Lampu penerangan jalan di Dusun III mati total, warga khawatir akan keamanan saat malam hari.',                              'status' => 'pending'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Drainase',             'keterangan' => 'Selokan di Dusun II tersumbat sampah, air menggenang dan menimbulkan penyakit.' ,                                           'status' => 'diproses'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Fasilitas Umum',       'keterangan' => 'Lapangan desa tidak terawat, rumput lebat dan tidak bisa digunakan untuk kegiatan olahraga warga.',                          'status' => 'ditolak'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Kesehatan',            'keterangan' => 'Posyandu di Dusun IV tidak rutin buka, ibu-ibu kesulitan memantau tumbuh kembang balita.',                                    'status' => 'selesai'],
            ['id_user_index' => 0, 'jenis_pengaduan' => 'Keamanan',             'keterangan' => 'Marak pencurian ternak di Dusun I, warga meminta pos kamling diaktifkan kembali dan ronda malam ditingkatkan.',               'status' => 'pending'],
        ];

        foreach ($data as $item) {
            Pengaduan::create([
                'id_user' => $userIds[$item['id_user_index']],
                'jenis_pengaduan' => $item['jenis_pengaduan'],
                'keterangan' => $item['keterangan'],
                'foto' => null,
                'status' => $item['status'],
            ]);
        }
    }
}
