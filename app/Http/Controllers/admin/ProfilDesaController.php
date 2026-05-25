<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ProfilDesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ProfilDesaController extends Controller
{
    public function index()
    {
        $profil = ProfilDesa::latest()->get();
        return Inertia::render('Admin/ProfilDesa', compact('profil'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_desa' => 'required|string|max:255',
            'kode_desa' => 'nullable|string|max:255',
            'nama_kecamatan' => 'required|string|max:255',
            'nama_kabupaten' => 'required|string|max:255',
            'nama_provinsi' => 'required|string|max:255',
            'alamat_desa' => 'nullable|string',
            'kode_pos' => 'nullable|string|max:20',
            'telepon' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'foto_kantor' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'kepala_desa' => 'nullable|string|max:255',
            'sambutan' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'sejarah' => 'nullable|string',
            'luas_wilayah' => 'nullable|string|max:255',
            'jumlah_penduduk' => 'nullable|integer',
            'latitude' => 'nullable|string|max:100',
            'longitude' => 'nullable|string|max:100',
            'facebook' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
        ]);

        $p = new ProfilDesa();
        foreach ($request->except(['logo', 'foto_kantor', '_token']) as $key => $value) {
            $p->{$key} = $value;
        }

        if ($request->hasFile('logo')) {
            $p->logo = $this->uploadFile($request->file('logo'), 'profil');
        }

        if ($request->hasFile('foto_kantor')) {
            $p->foto_kantor = $this->uploadFile($request->file('foto_kantor'), 'profil');
        }

        $p->save();

        return redirect()->back()->with('success', 'Profil desa berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_desa' => 'required|string|max:255',
            'kode_desa' => 'nullable|string|max:255',
            'nama_kecamatan' => 'required|string|max:255',
            'nama_kabupaten' => 'required|string|max:255',
            'nama_provinsi' => 'required|string|max:255',
            'alamat_desa' => 'nullable|string',
            'kode_pos' => 'nullable|string|max:20',
            'telepon' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'foto_kantor' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'kepala_desa' => 'nullable|string|max:255',
            'sambutan' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'sejarah' => 'nullable|string',
            'luas_wilayah' => 'nullable|string|max:255',
            'jumlah_penduduk' => 'nullable|integer',
            'latitude' => 'nullable|string|max:100',
            'longitude' => 'nullable|string|max:100',
            'facebook' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
        ]);

        $p = ProfilDesa::findOrFail($id);

        foreach ($request->except(['logo', 'foto_kantor', '_token']) as $key => $value) {
            $p->{$key} = $value;
        }

        if ($request->hasFile('logo')) {
            $this->deleteFile($p->logo);
            $p->logo = $this->uploadFile($request->file('logo'), 'profil');
        }

        if ($request->hasFile('foto_kantor')) {
            $this->deleteFile($p->foto_kantor);
            $p->foto_kantor = $this->uploadFile($request->file('foto_kantor'), 'profil');
        }

        $p->update();

        return redirect()->back()->with('success', 'Profil desa berhasil diubah');
    }

    public function delete($id)
    {
        $p = ProfilDesa::findOrFail($id);
        $this->deleteFile($p->logo);
        $this->deleteFile($p->foto_kantor);
        $p->delete();

        return redirect()->back()->with('success', 'Profil desa berhasil dihapus');
    }

    private function uploadFile($file, $folder): string
    {
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = public_path('uploads/' . $folder);

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $file->move($destination, $fileName);

        return '/uploads/' . $folder . '/' . $fileName;
    }

    private function deleteFile(?string $path): void
    {
        if (!$path) return;

        $filePath = public_path(ltrim($path, '/'));
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    }
}
