<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JabatanController extends Controller
{
    function index()
    {
        $jabatan = Jabatan::all();
        return Inertia::render('Admin/Jabatan', compact('jabatan'));
    }

    function store(Request $request)
    {
        $jb = new Jabatan();
        $jb->jabatan = $request->jabatan;
        $jb->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }


    function update(Request $request, $id)
    {
        $jb = Jabatan::find($id);
        $jb->jabatan = $request->jabatan;
        $jb->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $jb = Jabatan::find($id);
        $jb->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
