<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriBantuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriBantuanController extends Controller
{
    function index()
    {
        $kategori = KategoriBantuan::latest()->get();
        return Inertia::render('Admin/KategoriBantuan', compact('kategori'));
    }

    function store(Request $request)
    {
        $request->validate([
            'nama_bantuan' => 'required|string|max:255',
        ]);

        KategoriBantuan::create($request->only('nama_bantuan'));

        return redirect()->back()->with('success', 'Kategori bantuan berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'nama_bantuan' => 'required|string|max:255',
        ]);

        $kb = KategoriBantuan::findOrFail($id);
        $kb->update($request->only('nama_bantuan'));

        return redirect()->back()->with('success', 'Kategori bantuan berhasil diubah');
    }

    function delete($id)
    {
        $kb = KategoriBantuan::findOrFail($id);
        $kb->delete();

        return redirect()->back()->with('success', 'Kategori bantuan berhasil dihapus');
    }
}
