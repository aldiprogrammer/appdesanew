<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\ProfilDesa;
use App\Models\Berita;
use App\Models\Umkm;
use Inertia\Inertia;

class HomeController extends Controller
{
    function index()
    {
        $profil = ProfilDesa::latest()->first();
        $kepalaDesa = Pegawai::with('jb')
            ->whereHas('jb', function ($query) {
                $query->where('jabatan', 'like', '%kepala desa%');
            })
            ->latest()
            ->first();

        $berita = Berita::where('status', 0)->latest()->take(4)->get();
        $umkm = Umkm::latest()->take(4)->get();
        return Inertia::render('App/Home', [
            'title' => 'Home',
            'profil' => $profil,
            'kepalaDesaPhoto' => $kepalaDesa?->foto,
            'berita' => $berita,
            'umkm' => $umkm,
        ]);
    }
}
