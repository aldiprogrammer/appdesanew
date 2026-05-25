<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\KontakLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class KontakLayananController extends Controller
{
    public function index()
    {
        $kontak = KontakLayanan::latest()->get();
        return Inertia::render('Admin/KontakLayanan', compact('kontak'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'icon_class' => 'nullable|string|max:255',
            'nomor' => 'nullable|string|max:100',
            'icon_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $k = new KontakLayanan();
        $k->nama_layanan = $request->nama_layanan;
        $k->icon_class = $request->icon_class;
        $k->nomor = $request->nomor;

        if ($request->hasFile('icon_image')) {
            $k->icon_image = $this->uploadIcon($request->file('icon_image'));
        }

        $k->save();

        return redirect()->back()->with('success', 'Kontak layanan berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'icon_class' => 'nullable|string|max:255',
            'nomor' => 'nullable|string|max:100',
            'icon_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $k = KontakLayanan::findOrFail($id);

        $k->nama_layanan = $request->nama_layanan;
        $k->icon_class = $request->icon_class;
        $k->nomor = $request->nomor;

        if ($request->hasFile('icon_image')) {
            $this->deleteIcon($k->icon_image);
            $k->icon_image = $this->uploadIcon($request->file('icon_image'));
        }

        $k->update();

        return redirect()->back()->with('success', 'Kontak layanan berhasil diubah');
    }

    public function delete($id)
    {
        $k = KontakLayanan::findOrFail($id);
        $this->deleteIcon($k->icon_image);
        $k->delete();

        return redirect()->back()->with('success', 'Kontak layanan berhasil dihapus');
    }

    private function uploadIcon($file): string
    {
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/kontak');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/kontak/' . $fileName;
    }

    private function deleteIcon(?string $path): void
    {
        if (!$path) return;

        $filePath = public_path(ltrim($path, '/'));
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    }
}
