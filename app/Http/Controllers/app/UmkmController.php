<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Inertia\Inertia;

class UmkmController extends Controller
{
    function index()
    {
        $umkm = Umkm::latest()->get();
        return Inertia::render('App/Umkm', compact('umkm'));
    }

    function show($id)
    {
        $umkm = Umkm::findOrFail($id);
        return Inertia::render('App/UmkmDetail', compact('umkm'));
    }
}
