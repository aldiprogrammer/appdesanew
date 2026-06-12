<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Penduduk;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PengaduanController extends Controller
{
    function index()
    {
        return Inertia::render('App/Pengaduan');
    }

    function store(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|size:16|exists:penduduk_news,nik',
            'keterangan' => 'required|string|min:10',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $foto = null;
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $fotoName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/pengaduan');

            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $file->move($destination, $fotoName);
            $foto = '/uploads/pengaduan/' . $fotoName;
        }

        Pengaduan::create([
            'nik' => $request->nik,
            'keterangan' => $request->keterangan,
            'foto' => $foto,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Pengaduan berhasil dikirim. Silakan cek status secara berkala.');
    }

    function cekStatus(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|size:16|exists:penduduk_news,nik',
        ]);

        $pengaduan = Pengaduan::where('nik', $request->nik)
            ->latest()
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nik' => $p->nik,
                    'keterangan' => $p->keterangan,
                    'foto' => $p->foto,
                    'status' => $p->status,
                    'created_at' => $p->created_at->toDateTimeString(),
                ];
            });

        return back()->with([
            'pengaduan' => $pengaduan,
            'nik' => $request->nik,
        ]);
    }
}
