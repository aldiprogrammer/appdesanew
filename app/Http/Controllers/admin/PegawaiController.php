<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class PegawaiController extends Controller
{
    function index()
    {
        $pegawai = Pegawai::with('jb')->get();
        $jabatan = Jabatan::all();
        return Inertia::render('Admin/Pegawai', compact('pegawai', 'jabatan'));
    }

    function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:50',
            'nik' => 'required|string|max:18',
            'nip' => 'required|string|max:30',
            'jabatan' => 'required|exists:jabatans,id',
            'nohp' => 'required|string|max:18',
            'alamat' => 'required|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $pg = new Pegawai();
        $pg->nama = $request->nama;
        $pg->nik = $request->nik;
        $pg->nip = $request->nip;
        $pg->id_jabatan = $request->jabatan;
        $pg->nohp = $request->nohp;
        $pg->foto = $this->uploadFoto($request);
        $pg->alamat = $request->alamat;
        $pg->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:50',
            'nik' => 'required|string|max:18',
            'nip' => 'required|string|max:30',
            'jabatan' => 'required|exists:jabatans,id',
            'nohp' => 'required|string|max:18',
            'alamat' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $pg = Pegawai::findOrFail($id);

        if ($request->hasFile('foto')) {
            $this->deleteFoto($pg->foto);
            $pg->foto = $this->uploadFoto($request);
        }

        $pg->nama = $request->nama;
        $pg->nik = $request->nik;
        $pg->nip = $request->nip;
        $pg->id_jabatan = $request->jabatan;
        $pg->nohp = $request->nohp;
        $pg->alamat = $request->alamat;
        $pg->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $pg = Pegawai::findOrFail($id);
        $this->deleteFoto($pg->foto);
        $pg->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }


    private function uploadFoto(Request $request): string
    {
        $file = $request->file('foto');
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/pegawai');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/pegawai/' . $fileName;
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
