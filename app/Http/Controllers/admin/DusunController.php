<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DusunController extends Controller
{
    private function calculatePolygonArea(?array $polygon): ?float
    {
        if (!$polygon || count($polygon) < 3) {
            return null;
        }

        $earthRadius = 6378137;
        $area = 0;
        $pointCount = count($polygon);

        for ($i = 0; $i < $pointCount; $i++) {
            $current = $polygon[$i];
            $next = $polygon[($i + 1) % $pointCount];

            $currentLat = deg2rad((float) $current['lat']);
            $nextLat = deg2rad((float) $next['lat']);
            $longitudeDiff = deg2rad((float) $next['lng'] - (float) $current['lng']);

            $area += $longitudeDiff * (2 + sin($currentLat) + sin($nextLat));
        }

        return round(abs($area * $earthRadius * $earthRadius / 2), 2);
    }

    function index()
    {
        $dusun = Dusun::latest()->get();
        return Inertia::render('Admin/Dusun', compact('dusun'));
    }

    function store(Request $request)
    {
        $request->validate([
            'nama_dusun' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'polygon' => 'nullable|array',
            'polygon.*.lat' => 'required_with:polygon|numeric',
            'polygon.*.lng' => 'required_with:polygon|numeric',
        ]);

        $ds = new Dusun();
        $ds->nama_dusun = $request->nama_dusun;
        $ds->latitude = $request->latitude;
        $ds->longitude = $request->longitude;
        $ds->polygon = $request->polygon;
        $ds->luas_wilayah = $this->calculatePolygonArea($request->polygon);
        $ds->status = $request->status ?? 1;
        $ds->save();
        return redirect()->back()->with('success', 'Data dusun berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $request->validate([
            'nama_dusun' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'polygon' => 'nullable|array',
            'polygon.*.lat' => 'required_with:polygon|numeric',
            'polygon.*.lng' => 'required_with:polygon|numeric',
        ]);

        $ds = Dusun::findOrFail($id);
        $ds->nama_dusun = $request->nama_dusun;
        $ds->latitude = $request->latitude;
        $ds->longitude = $request->longitude;
        $ds->polygon = $request->polygon;
        $ds->luas_wilayah = $this->calculatePolygonArea($request->polygon);
        $ds->status = $request->status ?? $ds->status;
        $ds->update();
        return redirect()->back()->with('success', 'Data dusun berhasil diubah');
    }

    function delete($id)
    {
        $ds = Dusun::findOrFail($id);
        $ds->delete();
        return redirect()->back()->with('success', 'Data dusun berhasil dihapus');
    }
}
