<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use App\Models\Kepaladusun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class KepalaDusunController extends Controller
{
    function index()
    {
        $dusun = Dusun::all();
        $kadus = Kepaladusun::latest()->get();
        return Inertia::render('Admin/Kepaladusun', compact('dusun', 'kadus'));
    }

    function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:50',
            'nik' => 'required|string|max:18',
            'foto' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'id_dusun' => 'required|exists:dusuns,id',
            'tahun_kerja' => 'required|string|max:20',
            'tahun_akhir_kerja' => 'required|string|max:20',
        ]);

        $dusun = Dusun::findOrFail($request->id_dusun);

        $kadus = new Kepaladusun();
        $kadus->nama = $request->nama;
        $kadus->nik = $request->nik;
        $kadus->foto = $this->uploadFoto($request);
        $kadus->dusun = $dusun->nama_dusun;
        $kadus->id_dusun = $dusun->id;
        $kadus->tahun_kerja = $request->tahun_kerja;
        $kadus->tahun_akhir_kerja = $request->tahun_akhir_kerja;
        $kadus->save();

        return redirect()->back()->with('success', 'Data kepala dusun berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:50',
            'nik' => 'required|string|max:18',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'id_dusun' => 'required|exists:dusuns,id',
            'tahun_kerja' => 'required|string|max:20',
            'tahun_akhir_kerja' => 'required|string|max:20',
        ]);

        $dusun = Dusun::findOrFail($request->id_dusun);
        $kadus = Kepaladusun::findOrFail($id);

        if ($request->hasFile('foto')) {
            $this->deleteFoto($kadus->foto);
            $kadus->foto = $this->uploadFoto($request);
        }

        $kadus->nama = $request->nama;
        $kadus->nik = $request->nik;
        $kadus->dusun = $dusun->nama_dusun;
        $kadus->id_dusun = $dusun->id;
        $kadus->tahun_kerja = $request->tahun_kerja;
        $kadus->tahun_akhir_kerja = $request->tahun_akhir_kerja;
        $kadus->update();

        return redirect()->back()->with('success', 'Data kepala dusun berhasil diubah');
    }

    function delete($id)
    {
        $kadus = Kepaladusun::findOrFail($id);
        $this->deleteFoto($kadus->foto);
        $kadus->delete();

        return redirect()->back()->with('success', 'Data kepala dusun berhasil dihapus');
    }

    private function uploadFoto(Request $request): string
    {
        $file = $request->file('foto');
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/kepaladusun');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/kepaladusun/' . $fileName;
    }

    private function deleteFoto(?string $foto): void
    {
        if (!$foto) {
            return;
        }

        $path = public_path(ltrim($foto, '/'));

        if (File::exists($path)) {
            File::delete($path);
        }
    }
}
