<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Apbdes;
use App\Models\Berita;
use App\Models\Dusun;
use App\Models\Gallery;
use App\Models\Pegawai;
use App\Models\Penduduk;
use App\Models\Pengaduan;
use App\Models\Surat;
use App\Models\Umkm;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    function index()
    {
        $today = Carbon::today();

        $totalPenduduk = Penduduk::count();
        $totalSurat = Surat::count();
        $totalSuratHariIni = Surat::whereDate('created_at', $today)->count();
        $totalPengaduan = Pengaduan::count();
        $totalPengaduanHariIni = Pengaduan::whereDate('created_at', $today)->count();
        $totalUmkm = Umkm::count();
        $totalUser = User::where('role', 'penduduk')->count();
        $totalDusun = Dusun::count();
        $totalBerita = Berita::count();
        $totalPegawai = Pegawai::count();
        $totalGallery = Gallery::count();

        $apbdesTahunIni = Apbdes::where('tahun', $today->year)->first();
        $sisaApbdes = $apbdesTahunIni ? $apbdesTahunIni->sisaAnggaran() : 0;

        $suratPerBulan = Surat::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
            ->whereYear('created_at', $today->year)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total', 'bulan');

        $suratPerStatus = Surat::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $pengaduanPerBulan = Pengaduan::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
            ->whereYear('created_at', $today->year)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total', 'bulan');

        $pengaduanPerStatus = Pengaduan::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $suratPerJenis = Surat::selectRaw('jenis, COUNT(*) as total')
            ->groupBy('jenis')
            ->pluck('total', 'jenis');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPenduduk' => $totalPenduduk,
                'totalSurat' => $totalSurat,
                'totalSuratHariIni' => $totalSuratHariIni,
                'totalPengaduan' => $totalPengaduan,
                'totalPengaduanHariIni' => $totalPengaduanHariIni,
                'totalUmkm' => $totalUmkm,
                'totalUser' => $totalUser,
                'totalDusun' => $totalDusun,
                'totalBerita' => $totalBerita,
                'totalPegawai' => $totalPegawai,
                'totalGallery' => $totalGallery,
                'sisaApbdes' => $sisaApbdes,
            ],
            'charts' => [
                'suratPerBulan' => $suratPerBulan,
                'suratPerStatus' => $suratPerStatus,
                'pengaduanPerBulan' => $pengaduanPerBulan,
                'pengaduanPerStatus' => $pengaduanPerStatus,
                'suratPerJenis' => $suratPerJenis,
            ],
        ]);
    }
}
