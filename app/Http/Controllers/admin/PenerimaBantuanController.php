<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use App\Models\KategoriBantuan;
use App\Models\PenerimaBantuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenerimaBantuanController extends Controller
{
    function index()
    {
        $penerima = PenerimaBantuan::with(['dusun', 'kategoriBantuan'])->latest()->get();
        $dusun = Dusun::all(['id', 'nama_dusun']);
        $kategori = KategoriBantuan::all(['id', 'nama_bantuan']);

        return Inertia::render('Admin/PenerimaBantuan', compact('penerima', 'dusun', 'kategori'));
    }

    function store(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'dusun_id' => 'required|exists:dusuns,id',
            'kategori_bantuan_id' => 'required|exists:kategori_bantuans,id',
            'keterangan' => 'nullable|string',
        ]);

        PenerimaBantuan::create($request->only([
            'nik', 'nama', 'dusun_id', 'kategori_bantuan_id', 'keterangan',
        ]));

        return redirect()->back()->with('success', 'Penerima bantuan berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'nik' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'dusun_id' => 'required|exists:dusuns,id',
            'kategori_bantuan_id' => 'required|exists:kategori_bantuans,id',
            'keterangan' => 'nullable|string',
        ]);

        $pb = PenerimaBantuan::findOrFail($id);
        $pb->update($request->only([
            'nik', 'nama', 'dusun_id', 'kategori_bantuan_id', 'keterangan',
        ]));

        return redirect()->back()->with('success', 'Penerima bantuan berhasil diubah');
    }

    function delete($id)
    {
        $pb = PenerimaBantuan::findOrFail($id);
        $pb->delete();

        return redirect()->back()->with('success', 'Penerima bantuan berhasil dihapus');
    }
}
