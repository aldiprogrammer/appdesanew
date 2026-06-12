<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengaduanController extends Controller
{
    function index()
    {
        $pengaduan = Pengaduan::with('user')->with('penduduk')->latest()->get();
        $users = User::all(['id', 'name', 'email']);

        return Inertia::render('Admin/Pengaduan', compact('pengaduan', 'users'));
    }

    function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id',
            'nik' => 'nullable|string|size:16|exists:penduduk_news,nik',
            'jenis_pengaduan' => 'required|string|max:255',
            'keterangan' => 'required|string',
            'foto' => 'nullable|string',
            'status' => 'required|in:pending,diproses,selesai,ditolak',
        ]);

        Pengaduan::create($request->only(['id_user', 'nik', 'jenis_pengaduan', 'keterangan', 'foto', 'status']));

        return redirect()->back()->with('success', 'Pengaduan berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id',
            'nik' => 'nullable|string|size:16|exists:penduduk_news,nik',
            'jenis_pengaduan' => 'required|string|max:255',
            'keterangan' => 'required|string',
            'foto' => 'nullable|string',
            'status' => 'required|in:pending,diproses,selesai,ditolak',
        ]);

        $p = Pengaduan::findOrFail($id);
        $p->update($request->only(['id_user', 'nik', 'jenis_pengaduan', 'keterangan', 'foto', 'status']));

        return redirect()->back()->with('success', 'Pengaduan berhasil diubah');
    }

    function delete($id)
    {
        $p = Pengaduan::findOrFail($id);
        $p->delete();

        return redirect()->back()->with('success', 'Pengaduan berhasil dihapus');
    }
}
