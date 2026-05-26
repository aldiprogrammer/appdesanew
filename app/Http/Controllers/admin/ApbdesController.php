<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Apbdes;
use App\Models\ApbdesBelanja;
use App\Models\ApbdesPendapatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApbdesController extends Controller
{
    function index()
    {
        $apbdes = Apbdes::latest()->get();
        return Inertia::render('Admin/ApbdesIndex', compact('apbdes'));
    }

    function show($id)
    {
        $apbdes = Apbdes::with(['pendapatans', 'belanjas'])->findOrFail($id);
        return Inertia::render('Admin/ApbdesDetail', compact('apbdes'));
    }

    function store(Request $request)
    {
        $request->validate([
            'tahun' => 'required|integer|min:2020|max:2099|unique:apbdes,tahun',
            'keterangan' => 'nullable|string',
        ]);

        Apbdes::create([
            'tahun' => $request->tahun,
            'total_pendapatan' => 0,
            'total_belanja' => 0,
            'keterangan' => $request->keterangan,
            'status' => 'draft',
        ]);

        return redirect()->back()->with('success', 'APBDes tahun ' . $request->tahun . ' berhasil dibuat');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'tahun' => 'required|integer|min:2020|max:2099|unique:apbdes,tahun,' . $id,
            'keterangan' => 'nullable|string',
            'status' => 'required|in:draft,disetujui,ditolak,realisasi',
        ]);

        $a = Apbdes::findOrFail($id);
        $a->update($request->only(['tahun', 'keterangan', 'status']));

        return redirect()->back()->with('success', 'APBDes berhasil diubah');
    }

    function delete($id)
    {
        $a = Apbdes::findOrFail($id);
        $a->delete();

        return redirect()->back()->with('success', 'APBDes berhasil dihapus');
    }

    // ─── Pendapatan ─────────────────────────────────────────

    function storePendapatan(Request $request, $apbdesId)
    {
        $request->validate([
            'sumber_pendapatan' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $a = Apbdes::findOrFail($apbdesId);
        $a->pendapatans()->create($request->only(['sumber_pendapatan', 'jumlah', 'keterangan']));
        $this->recalculateTotals($a);

        return redirect()->back()->with('success', 'Pendapatan berhasil ditambah');
    }

    function updatePendapatan(Request $request, $apbdesId, $pendapatanId)
    {
        $request->validate([
            'sumber_pendapatan' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $p = ApbdesPendapatan::where('apbdes_id', $apbdesId)->findOrFail($pendapatanId);
        $p->update($request->only(['sumber_pendapatan', 'jumlah', 'keterangan']));
        $this->recalculateTotals(Apbdes::find($apbdesId));

        return redirect()->back()->with('success', 'Pendapatan berhasil diubah');
    }

    function deletePendapatan($apbdesId, $pendapatanId)
    {
        $p = ApbdesPendapatan::where('apbdes_id', $apbdesId)->findOrFail($pendapatanId);
        $p->delete();
        $this->recalculateTotals(Apbdes::find($apbdesId));

        return redirect()->back()->with('success', 'Pendapatan berhasil dihapus');
    }

    // ─── Belanja ────────────────────────────────────────────

    function storeBelanja(Request $request, $apbdesId)
    {
        $request->validate([
            'kegiatan' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            'lokasi' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $a = Apbdes::findOrFail($apbdesId);
        $a->belanjas()->create($request->only(['kegiatan', 'kategori', 'jumlah', 'lokasi', 'keterangan']));
        $this->recalculateTotals($a);

        return redirect()->back()->with('success', 'Belanja berhasil ditambah');
    }

    function updateBelanja(Request $request, $apbdesId, $belanjaId)
    {
        $request->validate([
            'kegiatan' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            'lokasi' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $b = ApbdesBelanja::where('apbdes_id', $apbdesId)->findOrFail($belanjaId);
        $b->update($request->only(['kegiatan', 'kategori', 'jumlah', 'lokasi', 'keterangan']));
        $this->recalculateTotals(Apbdes::find($apbdesId));

        return redirect()->back()->with('success', 'Belanja berhasil diubah');
    }

    function deleteBelanja($apbdesId, $belanjaId)
    {
        $b = ApbdesBelanja::where('apbdes_id', $apbdesId)->findOrFail($belanjaId);
        $b->delete();
        $this->recalculateTotals(Apbdes::find($apbdesId));

        return redirect()->back()->with('success', 'Belanja berhasil dihapus');
    }

    // ─── Helper ─────────────────────────────────────────────

    private function recalculateTotals(?Apbdes $a): void
    {
        if (!$a) return;

        $a->update([
            'total_pendapatan' => $a->pendapatans()->sum('jumlah'),
            'total_belanja' => $a->belanjas()->sum('jumlah'),
        ]);
    }
}
