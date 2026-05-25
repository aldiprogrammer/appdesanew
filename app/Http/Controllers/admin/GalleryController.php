<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::latest()->get();
        return Inertia::render('Admin/Gallery', compact('gallery'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kegiatan' => 'required|string|max:150',
            'tanggal' => 'required|date',
            'foto' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $g = new Gallery();
        $g->nama_kegiatan = $request->nama_kegiatan;
        $g->tanggal = $request->tanggal;
        $g->foto = $this->uploadFoto($request);
        $g->save();

        return redirect()->back()->with('success', 'Foto gallery berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_kegiatan' => 'required|string|max:150',
            'tanggal' => 'required|date',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $g = Gallery::findOrFail($id);

        if ($request->hasFile('foto')) {
            $this->deleteFoto($g->foto);
            $g->foto = $this->uploadFoto($request);
        }

        $g->nama_kegiatan = $request->nama_kegiatan;
        $g->tanggal = $request->tanggal;
        $g->update();

        return redirect()->back()->with('success', 'Foto gallery berhasil diubah');
    }

    public function delete($id)
    {
        $g = Gallery::findOrFail($id);
        $this->deleteFoto($g->foto);
        $g->delete();

        return redirect()->back()->with('success', 'Foto gallery berhasil dihapus');
    }


    private function uploadFoto(Request $request): string
    {
        $file = $request->file('foto');
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/gallery');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/gallery/' . $fileName;
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
