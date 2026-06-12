<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Penduduk;
use App\Models\Surat;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuratController extends Controller
{
    function index(Request $request)
    {
        $status = $request->input('status');
        $search = $request->input('search');

        $surats = Surat::with('user')
            ->when($status, fn($q, $s) => $q->where('status', $s))
            ->when($search, fn($q, $s) => $q->whereHas('user', fn($uq) => $uq->where('nik', 'like', "%{$s}%")->orWhere('name', 'like', "%{$s}%")))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Surat', [
            'surats' => $surats,
            'jenisList' => Surat::jenisList(),
            'statusFilter' => $status,
        ]);
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,diproses,selesai,ditolak',
            'keterangan' => 'nullable|string|max:1000',
        ]);

        $s = Surat::findOrFail($id);
        $s->update([
            'status' => $request->status,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->back()->with('success', 'Status surat berhasil diperbarui');
    }

    function delete($id)
    {
        $s = Surat::findOrFail($id);
        $s->delete();

        return redirect()->back()->with('success', 'Data surat berhasil dihapus');
    }

    function download($id)
    {
        $surat = Surat::with('user')->findOrFail($id);
        $user = $surat->user;
        $penduduk = Penduduk::where('nik', $user->nik)->first();

        $nomorSurat = sprintf(
            '470/%d/%s/%s/%s',
            $surat->id,
            $surat->created_at->format('m'),
            $surat->created_at->format('Y'),
            'KT'
        );

        $pdf = Pdf::loadView('surat.pdf', [
            'jenis' => $surat->jenis,
            'jenisLabel' => Surat::jenisList()[$surat->jenis],
            'data' => $surat->data,
            'penduduk' => $penduduk,
            'nomorSurat' => $nomorSurat,
            'tanggal' => now()->locale('id')->isoFormat('D MMMM Y'),
            'sekdes' => config('app.sekdes_name', 'Sekretaris Desa'),
        ]);

        $filename = 'Surat_' . str_replace(' ', '_', Surat::jenisList()[$surat->jenis]) . '_' . $user->name . '.pdf';

        return $pdf->download($filename);
    }
}
