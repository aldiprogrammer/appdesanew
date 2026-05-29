<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Penduduk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendudukController extends Controller
{
    function index(Request $request)
    {
        $search = $request->input('search');
        $dusunFilter = $request->input('dusun');
        $perPage = 50;

        $penduduk = Penduduk::when($search, function ($q, $s) {
            $q->where('nik', 'like', "%{$s}%")
              ->orWhere('nama', 'like', "%{$s}%");
        })->when($dusunFilter, function ($q, $d) {
            $q->where('dusun', $d);
        })->orderBy('nama')
          ->paginate($perPage)
          ->withQueryString();

        $dusunList = Penduduk::select('dusun')->distinct()->orderBy('dusun')->pluck('dusun');

        return Inertia::render('Admin/Penduduk', compact('penduduk', 'dusunList', 'search', 'dusunFilter'));
    }
}
