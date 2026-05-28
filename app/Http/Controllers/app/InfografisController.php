<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\PendudukNews;
use App\Models\Stanting;
use App\Models\PenerimaBantuan;
use Inertia\Inertia;

class InfografisController extends Controller
{
    function index()
    {
        $total = PendudukNews::count();

        $byGender = PendudukNews::selectRaw('sex, COUNT(*) as total')
            ->groupBy('sex')
            ->pluck('total', 'sex');

        $kepalaKeluarga = PendudukNews::where('kk_level', '1')->count();

        $agamaMap = [
            '1' => 'Islam',
            '2' => 'Kristen',
            '3' => 'Katolik',
            '4' => 'Hindu',
            '5' => 'Budha',
            '6' => 'Konghucu',
            '7' => 'Kepercayaan',
        ];

        $byAgama = PendudukNews::selectRaw('agama_id, COUNT(*) as total')
            ->whereNotNull('agama_id')
            ->groupBy('agama_id')
            ->pluck('total', 'agama_id');

        $agama = collect($agamaMap)
            ->map(fn($label, $id) => [
                'label' => $label,
                'total' => (int) ($byAgama[$id] ?? 0),
            ])
            ->filter(fn($item) => $item['total'] > 0)
            ->values();

        $pekerjaanMap = [
            '1' => 'Belum/Tidak Bekerja',
            '2' => 'Pelajar/Mahasiswa',
            '3' => 'Petani',
            '4' => 'Pedagang',
            '5' => 'PNS/TNI/Polri',
            '6' => 'Wiraswasta',
            '7' => 'Buruh',
            '8' => 'Sopir',
            '9' => 'Nelayan',
            '15' => 'Perangkat Desa',
            '16' => 'Guru',
            '18' => 'Dokter',
            '19' => 'Perawat/Bidan',
            '20' => 'Seniman',
            '23' => 'Pengacara',
            '26' => 'Karyawan Swasta',
            '35' => 'Tukang',
            '65' => 'Peternak',
            '72' => 'Penjahit',
            '74' => 'Montir',
            '81' => 'PRT',
            '88' => 'Ibu Rumah Tangga',
        ];

        $byPekerjaan = PendudukNews::selectRaw('pekerjaan_id, COUNT(*) as total')
            ->whereNotNull('pekerjaan_id')
            ->groupBy('pekerjaan_id')
            ->pluck('total', 'pekerjaan_id');

        $pekerjaan = collect($byPekerjaan)
            ->map(fn($count, $id) => [
                'label' => $pekerjaanMap[$id] ?? "Lainnya ($id)",
                'total' => (int) $count,
            ])
            ->sortByDesc('total')
            ->values();

        $statusKawinMap = [
            '1' => 'Belum Kawin',
            '2' => 'Kawin',
            '3' => 'Cerai Mati',
            '4' => 'Cerai Hidup',
        ];

        $byKawin = PendudukNews::selectRaw('status_kawin, COUNT(*) as total')
            ->whereNotNull('status_kawin')
            ->groupBy('status_kawin')
            ->pluck('total', 'status_kawin');

        $statusKawin = collect($statusKawinMap)
            ->map(fn($label, $id) => [
                'label' => $label,
                'total' => (int) ($byKawin[$id] ?? 0),
            ])
            ->filter(fn($item) => $item['total'] > 0)
            ->values();

        $totalStanting = Stanting::count();

        $stantingPerDusun = Stanting::selectRaw('dusuns.nama_dusun, COUNT(*) as total')
            ->join('dusuns', 'dusuns.id', '=', 'stantings.dusun_id')
            ->groupBy('dusuns.nama_dusun')
            ->orderByDesc('total')
            ->get();

        $totalBansos = PenerimaBantuan::count();

        $bansosPerKategori = PenerimaBantuan::selectRaw('kategori_bantuans.nama_bantuan, COUNT(*) as total')
            ->join('kategori_bantuans', 'kategori_bantuans.id', '=', 'penerima_bantuans.kategori_bantuan_id')
            ->groupBy('kategori_bantuans.nama_bantuan')
            ->orderByDesc('total')
            ->get();

        return Inertia::render('App/Infografis', [
            'total' => $total,
            'lakiLaki' => (int) ($byGender['1'] ?? 0),
            'perempuan' => (int) ($byGender['2'] ?? 0),
            'kepalaKeluarga' => $kepalaKeluarga,
            'agama' => $agama,
            'pekerjaan' => $pekerjaan,
            'statusKawin' => $statusKawin,
            'totalStanting' => $totalStanting,
            'stantingPerDusun' => $stantingPerDusun,
            'totalBansos' => $totalBansos,
            'bansosPerKategori' => $bansosPerKategori,
        ]);
    }
}
