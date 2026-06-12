<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Penduduk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendudukController extends Controller
{
    private $agamaMap = [
        '1' => 'Islam',
        '2' => 'Kristen',
        '3' => 'Katolik',
        '4' => 'Hindu',
        '5' => 'Budha',
        '6' => 'Konghucu',
        '7' => 'Kepercayaan',
    ];

    private $pekerjaanMap = [
        '1'  => 'Belum/Tidak Bekerja',
        '2'  => 'Pelajar/Mahasiswa',
        '3'  => 'Petani',
        '4'  => 'Pedagang',
        '5'  => 'PNS/TNI/Polri',
        '6'  => 'Wiraswasta',
        '7'  => 'Buruh',
        '8'  => 'Sopir',
        '9'  => 'Nelayan',
        '15' => 'Perangkat Desa',
        '16' => 'Guru',
        '18' => 'Dokter',
        '19' => 'Perawat/Bidan',
        '20' => 'Seniman',
        '23' => 'Pengacara',
        '26' => 'Karyawan Swasta',
        '35' => 'Tukang',
        '65' => 'Peternak',
        '72' => 'Penjahit',
        '74' => 'Montir',
        '81' => 'PRT',
        '88' => 'Ibu Rumah Tangga',
    ];

    private $kawinMap = [
        '1' => 'Belum Kawin',
        '2' => 'Kawin',
        '3' => 'Cerai Mati',
        '4' => 'Cerai Hidup',
    ];

    function index(Request $request)
    {
        $search = $request->input('search');
        $dusunFilter = $request->input('dusun');
        $perPage = 50;

        $penduduk = Penduduk::when($search, function ($q, $s) {
            $q->where('nik', 'like', "%{$s}%")
              ->orWhere('nama', 'like', "%{$s}%")
              ->orWhere('no_kk', 'like', "%{$s}%");
        })->when($dusunFilter, function ($q, $d) {
            $q->where('dusun', $d);
        })->orderBy('nama')
          ->paginate($perPage)
          ->withQueryString();

        $dusunList = Penduduk::select('dusun')->distinct()->orderBy('dusun')->pluck('dusun');

        $agamaOptions = collect($this->agamaMap)->map(fn($label, $id) => [
            'id' => $id, 'label' => $label,
        ])->values();

        $pekerjaanOptions = collect($this->pekerjaanMap)->map(fn($label, $id) => [
            'id' => $id, 'label' => $label,
        ])->values();

        $kawinOptions = collect($this->kawinMap)->map(fn($label, $id) => [
            'id' => $id, 'label' => $label,
        ])->values();

        return Inertia::render('Admin/Penduduk', compact(
            'penduduk', 'dusunList', 'search', 'dusunFilter',
            'agamaOptions', 'pekerjaanOptions', 'kawinOptions'
        ));
    }

    function store(Request $request)
    {
        $validated = $request->validate([
            'nik'              => 'required|string|max:25',
            'nama'             => 'required|string|max:255',
            'no_kk'            => 'nullable|string|max:25',
            'dusun'            => 'nullable|string|max:255',
            'rt'               => 'nullable|string|max:10',
            'rw'               => 'nullable|string|max:10',
            'sex'              => 'nullable|string|max:20',
            'tempatlahir'      => 'nullable|string|max:255',
            'tanggallahir'     => 'nullable|date',
            'agama_id'         => 'nullable|string|max:10',
            'pekerjaan_id'     => 'nullable|string|max:10',
            'status_kawin'     => 'nullable|string|max:10',
            'kk_level'         => 'nullable|string|max:10',
            'alamat'           => 'nullable|string',
            'nama_ayah'        => 'nullable|string|max:255',
            'nama_ibu'         => 'nullable|string|max:255',
        ]);

        Penduduk::create($validated);

        return redirect()->back()->with('success', 'Data penduduk berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nik'              => 'required|string|max:25',
            'nama'             => 'required|string|max:255',
            'no_kk'            => 'nullable|string|max:25',
            'dusun'            => 'nullable|string|max:255',
            'rt'               => 'nullable|string|max:10',
            'rw'               => 'nullable|string|max:10',
            'sex'              => 'nullable|string|max:20',
            'tempatlahir'      => 'nullable|string|max:255',
            'tanggallahir'     => 'nullable|date',
            'agama_id'         => 'nullable|string|max:10',
            'pekerjaan_id'     => 'nullable|string|max:10',
            'status_kawin'     => 'nullable|string|max:10',
            'kk_level'         => 'nullable|string|max:10',
            'alamat'           => 'nullable|string',
            'nama_ayah'        => 'nullable|string|max:255',
            'nama_ibu'         => 'nullable|string|max:255',
        ]);

        $p = Penduduk::findOrFail($id);
        $p->update($validated);

        return redirect()->back()->with('success', 'Data penduduk berhasil diubah');
    }

    function delete($id)
    {
        $p = Penduduk::findOrFail($id);
        $p->delete();

        return redirect()->back()->with('success', 'Data penduduk berhasil dihapus');
    }
}
