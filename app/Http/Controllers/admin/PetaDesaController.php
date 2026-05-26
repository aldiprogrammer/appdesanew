<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use App\Models\ProfilDesa;
use Inertia\Inertia;

class PetaDesaController extends Controller
{
    public function index()
    {
        $profil = ProfilDesa::latest()->first();
        $dusun = Dusun::select(['id', 'nama_dusun', 'latitude', 'longitude', 'polygon', 'status', 'luas_wilayah'])->get();

        return Inertia::render('Admin/PetaDesa', compact('profil', 'dusun'));
    }
}
