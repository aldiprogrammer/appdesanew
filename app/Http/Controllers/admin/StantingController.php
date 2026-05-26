<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use App\Models\Stanting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StantingController extends Controller
{
    function index()
    {
        $stanting = Stanting::with('dusun')->latest()->get();
        $dusun = Dusun::all(['id', 'nama_dusun']);

        return Inertia::render('Admin/Stanting', compact('stanting', 'dusun'));
    }

    function store(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'dusun_id' => 'required|exists:dusuns,id',
        ]);

        Stanting::create($request->only(['nik', 'nama', 'dusun_id']));

        return redirect()->back()->with('success', 'Data stanting berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'nik' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'dusun_id' => 'required|exists:dusuns,id',
        ]);

        $s = Stanting::findOrFail($id);
        $s->update($request->only(['nik', 'nama', 'dusun_id']));

        return redirect()->back()->with('success', 'Data stanting berhasil diubah');
    }

    function delete($id)
    {
        $s = Stanting::findOrFail($id);
        $s->delete();

        return redirect()->back()->with('success', 'Data stanting berhasil dihapus');
    }
}
