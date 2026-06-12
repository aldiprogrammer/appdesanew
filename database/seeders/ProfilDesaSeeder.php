<?php

namespace Database\Seeders;

use App\Models\ProfilDesa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfilDesaSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        ProfilDesa::create([
            'nama_desa' => 'Tanjung Putus',
            'kode_desa' => '1205212005',
            'nama_kecamatan' => 'Padang Tualang',
            'nama_kabupaten' => 'Langkat',
            'nama_provinsi' => 'Sumatera Utara',
            'alamat_desa' => 'Jl. Besar Desa Tanjung Putus, Kec. Padang Tualang, Kab. Langkat, Sumatera Utara',
            'kode_pos' => '20858',
            'telepon' => '081361234567',
            'email' => 'desatanjungputus@gmail.com',
            'website' => 'https://tanjungputus.desa.id',
            'kepala_desa' => 'Bambang Supriyadi',
            'sambutan' => 'Selamat datang di website resmi Desa Tanjung Putus. Media ini hadir sebagai sarana informasi, komunikasi, dan pelayanan bagi seluruh masyarakat. Semoga website ini dapat memperkuat keterbukaan pemerintah desa serta menjadi ruang bersama untuk mengenal potensi, program, dan perkembangan desa.',
            'visi' => 'Terwujudnya Desa Tanjung Putus yang Maju, Mandiri, Sejahtera, dan Berkelanjutan Berlandaskan Gotong Royong dan Nilai-Nilai Kearifan Lokal.',
            'misi' => "Meningkatkan kualitas pelayanan publik yang cepat, transparan, dan akuntabel\nMengembangkan potensi ekonomi desa melalui pemberdayaan UMKM dan BUMDes\nMembangun infrastruktur desa yang merata dan berkualitas\nMelestarikan nilai-nilai budaya dan kearifan lokal\nMewujudkan tata kelola pemerintahan desa yang partisipatif",
            'sejarah' => 'Desa Tanjung Putus berdiri sejak tahun 1950 dan telah mengalami berbagai perkembangan signifikan dalam bidang infrastruktur, pendidikan, dan ekonomi masyarakat.',
            'luas_wilayah' => '1,250',
            'jumlah_penduduk' => 3520,
            'latitude' => '3.82088',
            'longitude' => '98.21595',
            'facebook' => 'https://facebook.com/desatanjungputus',
            'instagram' => 'https://instagram.com/desatanjungputus',
            'youtube' => 'https://youtube.com/@desatanjungputus',
            'logo' => null,
            'foto_kantor' => null,
        ]);
    }
}
