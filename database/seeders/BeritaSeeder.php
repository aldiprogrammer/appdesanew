<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeritaSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Berita::create([
            'judul' => 'GOTONG ROYONG BERSIHKAN LINGKUNGAN DESA TANJUNG PUTUS',
            'keterangan' => 'Warga Desa Tanjung Putus bersama-sama melaksanakan kegiatan gotong royong membersihkan lingkungan desa, mulai dari saluran air, pinggir jalan utama, hingga area pemakaman umum. Kegiatan ini diikuti oleh puluhan warga dari berbagai dusun dan berjalan dengan penuh semangat kebersamaan. Kepala Desa Tanjung Putus mengapresiasi antusiasme warga dan berharap kegiatan ini dapat menjadi agenda rutin setiap bulan.',
            'tanggal_posting' => '2026-05-15',
            'status' => 0,
            'foto' => 'https://placehold.co/800x400/emerald/white?text=Gotong+Royong',
        ]);

        Berita::create([
            'judul' => 'PEMERINTAH DESA SALURKAN BANTUAN LANGSUNG TUNAI DANA DESA 2026',
            'keterangan' => 'Pemerintah Desa Tanjung Putus menyalurkan Bantuan Langsung Tunai (BLT) Dana Desa tahun 2026 kepada 85 keluarga penerima manfaat. Penyaluran dilakukan di balai desa dengan protokol yang tertib. Masing-masing penerima menerima dana sebesar Rp300.000 per bulan untuk periode tiga bulan pertama. Camat Padang Tualang turut hadir dan memberikan arahan langsung kepada warga.',
            'tanggal_posting' => '2026-04-20',
            'status' => 0,
            'foto' => 'https://placehold.co/800x400/emerald/white?text=BLT+Dana+Desa',
        ]);

        Berita::create([
            'judul' => 'PEMBANGUNAN JALAN USAHA TANI DUSUN I DAN II TELAH DIMULAI',
            'keterangan' => 'Pembangunan jalan usaha tani (JUT) sepanjang 1,2 kilometer yang menghubungkan Dusun I dan Dusun II Desa Tanjung Putus resmi dimulai. Proyek ini dibiayai melalui Dana Desa tahun anggaran 2026 dan ditargetkan selesai dalam waktu 60 hari kerja. Jalan ini diharapkan dapat mempermudah akses petani menuju lahan pertanian dan perkebunan serta menekan biaya distribusi hasil panen.',
            'tanggal_posting' => '2026-03-10',
            'status' => 0,
            'foto' => 'https://placehold.co/800x400/emerald/white?text=Jalan+Usaha+Tani',
        ]);

        Berita::create([
            'judul' => 'POSYANDU DESA TANJUNG PUTUS GELAR IMUNISASI BAYI DAN BALITA',
            'keterangan' => 'Posyandu Melati Desa Tanjung Putus menggelar kegiatan imunisasi rutin bagi bayi dan balita di wilayah desa. Sebanyak 47 bayi dan balita mendapatkan imunisasi lengkap sesuai usia. Kegiatan ini juga dirangkaikan dengan penimbangan berat badan, pengukuran tinggi badan, serta penyuluhan gizi bagi ibu-ibu. Bidan desa serta kader posyandu turut mendampingi jalannya kegiatan.',
            'tanggal_posting' => '2026-02-18',
            'status' => 0,
            'foto' => 'https://placehold.co/800x400/emerald/white?text=Posyandu+Imunisasi',
        ]);

        Berita::create([
            'judul' => 'SOSIALISASI PENCEGAHAN STUNTING MELIBATKAN SELURUH KADER DESA',
            'keterangan' => 'Pemerintah Desa Tanjung Putus bekerja sama dengan Puskesmas Padang Tualang mengadakan sosialisasi pencegahan stunting yang melibatkan seluruh kader desa, kader posyandu, serta ibu hamil dan ibu balita. Materi sosialisasi meliputi pentingnya gizi seimbang, pola asuh yang baik, serta akses terhadap layanan kesehatan. Kepala desa berharap kegiatan ini dapat menekan angka stunting di desa hingga nol kasus.',
            'tanggal_posting' => '2026-01-25',
            'status' => 0,
            'foto' => 'https://placehold.co/800x400/emerald/white?text=Cegah+Stunting',
        ]);

        Berita::create([
            'judul' => 'BUMDes TANJUNG PUTUS LUNCURKAN PRODUK OLAHAN HASIL PERTANIAN LOKAL',
            'keterangan' => 'Badan Usaha Milik Desa (BUMDes) Tanjung Putus meluncurkan produk unggulan berupa olahan hasil pertanian lokal, yaitu keripik singkong pedas manis dan abon ikan lele. Produk ini merupakan hasil dari program pemberdayaan ekonomi masyarakat yang difasilitasi oleh pemerintah desa. Saat ini produk sudah dipasarkan di beberapa warung dan toko oleh-oleh di Kecamatan Padang Tualang serta direncanakan akan masuk ke platform digital.',
            'tanggal_posting' => '2025-12-05',
            'status' => 0,
            'foto' => 'https://placehold.co/800x400/emerald/white?text=BUMDes+Produk',
        ]);
    }
}
