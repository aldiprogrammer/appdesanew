<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Penduduk;
use App\Models\Surat;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SuratController extends Controller
{
    function dashboard()
    {
        $user = Auth::user();
        $surats = Surat::where('user_id', $user->id)->latest()->take(5)->get();
        $penduduk = Penduduk::where('nik', $user->nik)->first();

        return Inertia::render('Surat/Dashboard', [
            'user' => $user,
            'penduduk' => $penduduk,
            'surats' => $surats,
            'jenisList' => Surat::jenisList(),
        ]);
    }

    function create($jenis)
    {
        if (!array_key_exists($jenis, Surat::jenisList())) {
            return redirect('/surat/dashboard')->with('error', 'Jenis surat tidak valid.');
        }

        $user = Auth::user();
        $penduduk = Penduduk::where('nik', $user->nik)->first();

        return Inertia::render('Surat/BuatSurat', [
            'jenis' => $jenis,
            'jenisLabel' => Surat::jenisList()[$jenis],
            'penduduk' => $penduduk,
            'dusunList' => Penduduk::select('dusun')->distinct()->orderBy('dusun')->pluck('dusun'),
        ]);
    }

    function store(Request $request)
    {
        $jenis = $request->jenis;

        if (!array_key_exists($jenis, Surat::jenisList())) {
            return redirect('/surat/dashboard')->with('error', 'Jenis surat tidak valid.');
        }

        $rules = $this->validationRules($jenis);
        $validated = $request->validate($rules);

        $data = $validated;
        $data['nik'] = Auth::user()->nik;
        $data['nama'] = Auth::user()->name;

        Surat::create([
            'user_id' => Auth::id(),
            'jenis' => $jenis,
            'data' => $data,
            'status' => 'pending',
        ]);

        return redirect('/surat/riwayat')->with('success', 'Pengajuan surat berhasil dikirim.');
    }

    function riwayat()
    {
        $surats = Surat::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Surat/Riwayat', [
            'surats' => $surats,
            'jenisList' => Surat::jenisList(),
        ]);
    }

    function download($id)
    {
        $surat = Surat::where('user_id', Auth::id())->findOrFail($id);

        if ($surat->status !== 'selesai') {
            return redirect()->back()->with('error', 'Surat belum selesai diproses.');
        }

        $user = Auth::user();
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

    private function validationRules($jenis): array
    {
        $base = [
            'jenis' => 'required|string',
        ];

        $common = [
            'keperluan' => 'nullable|string|max:500',
        ];

        $byJenis = match ($jenis) {
            'domisili' => [
                'alamat_domisili' => 'required|string|max:500',
                'rt' => 'nullable|string|max:10',
                'rw' => 'nullable|string|max:10',
            ],
            'tidak_mampu' => [
                'penghasilan' => 'nullable|string|max:255',
                'keterangan_tidak_mampu' => 'nullable|string|max:500',
            ],
            'usaha' => [
                'nama_usaha' => 'required|string|max:255',
                'bidang_usaha' => 'nullable|string|max:255',
                'alamat_usaha' => 'nullable|string|max:500',
            ],
            'belum_menikah' => [
                'keperluan_surat' => 'required|string|max:500',
            ],
            'pindah' => [
                'alamat_tujuan' => 'required|string|max:500',
                'alasan_pindah' => 'nullable|string|max:500',
                'rt' => 'nullable|string|max:10',
                'rw' => 'nullable|string|max:10',
            ],
            default => [],
        };

        return array_merge($base, $common, $byJenis);
    }
}
