<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Apbdes;
use Inertia\Inertia;

class ApbdesController extends Controller
{
    function index()
    {
        $anggaran = Apbdes::with(['pendapatans', 'belanjas'])
            ->where('status', '!=', 'draft')
            ->latest('tahun')
            ->get();

        return Inertia::render('App/Apbdes', [
            'anggaran' => $anggaran,
        ]);
    }
}
