<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\KontakLayanan;
use Inertia\Inertia;

class KontakLayananController extends Controller
{
    function index()
    {
        $kontak = KontakLayanan::latest()->get();

        return Inertia::render('App/KontakLayanan', [
            'kontak' => $kontak,
        ]);
    }
}
