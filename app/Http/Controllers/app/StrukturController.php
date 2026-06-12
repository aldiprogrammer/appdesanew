<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use Inertia\Inertia;

class StrukturController extends Controller
{
    function index()
    {
        $pegawai = Pegawai::with('jb')->latest()->get();

        return Inertia::render('App/Struktur', [
            'pegawai' => $pegawai,
        ]);
    }
}
