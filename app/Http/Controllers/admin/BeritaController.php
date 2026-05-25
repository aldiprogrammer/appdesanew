<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::latest()->get();
        return Inertia::render('Admin/Berita', compact('berita'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:150',
            'keterangan' => 'required|string',
            'tanggal_posting' => 'required|date',
            'status' => 'required|in:0,1',
            'foto' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $berita = new Berita();
        $berita->judul = $request->judul;
        $berita->keterangan = $request->keterangan;
        $berita->tanggal_posting = $request->tanggal_posting;
        $berita->status = $request->status;
        $berita->foto = $this->uploadFoto($request);
        $berita->save();

        return redirect()->back()->with('success', 'Berita berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:150',
            'keterangan' => 'required|string',
            'tanggal_posting' => 'required|date',
            'status' => 'required|in:0,1',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $berita = Berita::findOrFail($id);

        if ($request->hasFile('foto')) {
            $this->deleteFoto($berita->foto);
            $berita->foto = $this->uploadFoto($request);
        }

        $berita->judul = $request->judul;
        $berita->keterangan = $request->keterangan;
        $berita->tanggal_posting = $request->tanggal_posting;
        $berita->status = $request->status;
        $berita->update();

        return redirect()->back()->with('success', 'Berita berhasil diubah');
    }

    public function delete($id)
    {
        $berita = Berita::findOrFail($id);
        $this->deleteFoto($berita->foto);
        $berita->delete();

        return redirect()->back()->with('success', 'Berita berhasil dihapus');
    }

    private function uploadFoto(Request $request): string
    {
        $file = $request->file('foto');
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/berita');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/berita/' . $fileName;
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
