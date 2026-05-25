<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class UmkmController extends Controller
{
    public function index()
    {
        $umkm = Umkm::latest()->get();
        return Inertia::render('Admin/Umkm', compact('umkm'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'nohp' => 'nullable|string|max:50',
            'foto1' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'foto2' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'foto3' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $u = new Umkm();
        $u->nama_usaha = $request->nama_usaha;
        $u->alamat = $request->alamat;
        $u->keterangan = $request->keterangan;
        $u->nohp = $request->nohp;

        if ($request->hasFile('foto1')) {
            $u->foto1 = $this->uploadFoto($request->file('foto1'));
        }

        if ($request->hasFile('foto2')) {
            $u->foto2 = $this->uploadFoto($request->file('foto2'));
        }

        if ($request->hasFile('foto3')) {
            $u->foto3 = $this->uploadFoto($request->file('foto3'));
        }

        $u->save();

        return redirect()->back()->with('success', 'UMKM berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'nohp' => 'nullable|string|max:50',
            'foto1' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'foto2' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'foto3' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $u = Umkm::findOrFail($id);

        $u->nama_usaha = $request->nama_usaha;
        $u->alamat = $request->alamat;
        $u->keterangan = $request->keterangan;
        $u->nohp = $request->nohp;

        if ($request->hasFile('foto1')) {
            $this->deleteFoto($u->foto1);
            $u->foto1 = $this->uploadFoto($request->file('foto1'));
        }

        if ($request->hasFile('foto2')) {
            $this->deleteFoto($u->foto2);
            $u->foto2 = $this->uploadFoto($request->file('foto2'));
        }

        if ($request->hasFile('foto3')) {
            $this->deleteFoto($u->foto3);
            $u->foto3 = $this->uploadFoto($request->file('foto3'));
        }

        $u->update();

        return redirect()->back()->with('success', 'UMKM berhasil diubah');
    }

    public function delete($id)
    {
        $u = Umkm::findOrFail($id);
        $this->deleteFoto($u->foto1);
        $this->deleteFoto($u->foto2);
        $this->deleteFoto($u->foto3);
        $u->delete();

        return redirect()->back()->with('success', 'UMKM berhasil dihapus');
    }

    private function uploadFoto($file): string
    {
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/umkm');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/umkm/' . $fileName;
    }

    private function deleteFoto(?string $path): void
    {
        if (!$path) return;

        $filePath = public_path(ltrim($path, '/'));
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    }
}
