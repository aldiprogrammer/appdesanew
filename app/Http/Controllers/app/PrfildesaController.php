<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use App\Models\Pegawai;
use App\Models\ProfilDesa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrfildesaController extends Controller
{
    function index()
    {
        $profil = ProfilDesa::latest()->first();
        $kades = Pegawai::latest()->first();
        $dusun = Dusun::select(['id', 'nama_dusun', 'latitude', 'longitude', 'polygon', 'status', 'luas_wilayah'])->get();
        return Inertia::render('App/ProfilDesa', compact('profil', 'kades', 'dusun'));
    }
}
