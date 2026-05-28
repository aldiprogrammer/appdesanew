<?php

use App\Http\Controllers\admin\DusunController;
use App\Http\Controllers\admin\HomeController;
use App\Http\Controllers\admin\JabatanController;
use App\Http\Controllers\admin\KepalaDusunController;
use App\Http\Controllers\admin\PegawaiController;
use App\Http\Controllers\admin\BeritaController;
use App\Http\Controllers\admin\GalleryController;
use App\Http\Controllers\admin\ProfilDesaController;
use App\Http\Controllers\admin\PetaDesaController;
use App\Http\Controllers\admin\UmkmController;
use App\Http\Controllers\admin\KontakLayananController;
use App\Http\Controllers\admin\KategoriBantuanController;
use App\Http\Controllers\admin\PenerimaBantuanController;
use App\Http\Controllers\admin\StantingController;
use App\Http\Controllers\admin\ApbdesController;
use App\Http\Controllers\app\HomeController as AppHomeController;
use App\Http\Controllers\app\PrfildesaController;
use App\Http\Controllers\app\InfografisController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/admin/dashboard', [HomeController::class, 'index'])->name('dashboard');
Route::get('/admin/dusun', [DusunController::class, 'index'])->name('dusun');
Route::post('/admin/dusun', [DusunController::class, 'store'])->name('store.dusun');
Route::put('/admin/dusun/{id}', [DusunController::class, 'update'])->name('update.dusun');
Route::delete('/admin/dusun/{id}', [DusunController::class, 'delete'])->name('delete.dusun');

Route::get('/admin/kepaladusun', [KepalaDusunController::class, 'index'])->name('kepaladusun');
Route::post('/admin/kepaladusun', [KepalaDusunController::class, 'store'])->name('store.kepaladusun');
Route::post('/admin/kepaladusun/{id}', [KepalaDusunController::class, 'update'])->name('update.kepaladusun');
Route::delete('/admin/kepaladusun/{id}', [KepalaDusunController::class, 'delete'])->name('delete.kepaladusun');

Route::get('/admin/jabatan', [JabatanController::class, 'index'])->name('jabatan');
Route::post('/admin/jabatan', [JabatanController::class, 'store'])->name('store.jabatan');
Route::put('/admin/jabatan/{id}', [JabatanController::class, 'update'])->name('update.jabatan');
Route::delete('/admin/jabatan/{id}', [JabatanController::class, 'delete'])->name('delete.jabatan');


Route::get('/admin/berita', [BeritaController::class, 'index'])->name('berita');
Route::post('/admin/berita', [BeritaController::class, 'store'])->name('store.berita');
Route::put('/admin/berita/{id}', [BeritaController::class, 'update'])->name('update.berita');
Route::delete('/admin/berita/{id}', [BeritaController::class, 'delete'])->name('delete.berita');

Route::get('/admin/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::post('/admin/gallery', [GalleryController::class, 'store'])->name('store.gallery');
Route::put('/admin/gallery/{id}', [GalleryController::class, 'update'])->name('update.gallery');
Route::delete('/admin/gallery/{id}', [GalleryController::class, 'delete'])->name('delete.gallery');

Route::get('/admin/profil-desa', [ProfilDesaController::class, 'index'])->name('profil.desa');
Route::post('/admin/profil-desa', [ProfilDesaController::class, 'store'])->name('store.profil.desa');
Route::put('/admin/profil-desa/{id}', [ProfilDesaController::class, 'update'])->name('update.profil.desa');
Route::delete('/admin/profil-desa/{id}', [ProfilDesaController::class, 'delete'])->name('delete.profil.desa');

Route::get('/admin/peta-desa', [PetaDesaController::class, 'index'])->name('peta.desa');

Route::get('/admin/pegawai', [PegawaiController::class, 'index'])->name('pegawai');
Route::post('/admin/pegawai', [PegawaiController::class, 'store'])->name('store.pegawai');
Route::put('/admin/pegawai/{id}', [PegawaiController::class, 'update'])->name('update.pegawai');
Route::delete('/admin/pegawai/{id}', [PegawaiController::class, 'delete'])->name('delete.pegawai');

Route::get('/admin/umkm', [UmkmController::class, 'index'])->name('umkm');
Route::post('/admin/umkm', [UmkmController::class, 'store'])->name('store.umkm');
Route::put('/admin/umkm/{id}', [UmkmController::class, 'update'])->name('update.umkm');
Route::delete('/admin/umkm/{id}', [UmkmController::class, 'delete'])->name('delete.umkm');

Route::get('/admin/kontak-layanan', [KontakLayananController::class, 'index'])->name('kontak.layanan');
Route::post('/admin/kontak-layanan', [KontakLayananController::class, 'store'])->name('store.kontak.layanan');
Route::put('/admin/kontak-layanan/{id}', [KontakLayananController::class, 'update'])->name('update.kontak.layanan');
Route::delete('/admin/kontak-layanan/{id}', [KontakLayananController::class, 'delete'])->name('delete.kontak.layanan');

Route::get('/desa', [AppHomeController::class, 'index'])->name('home');
Route::get('/berita', function () {
    $berita = \App\Models\Berita::where('status', 0)->latest()->get();
    return Inertia::render('App/BeritaList', compact('berita'));
})->name('berita.list');
Route::get('/berita/{id}', function ($id) {
    $berita = \App\Models\Berita::where('status', 0)->findOrFail($id);
    return Inertia::render('App/BeritaDetail', compact('berita'));
})->name('berita.detail');
Route::get('/struktur', function () {
    return Inertia::render('App/Struktur');
})->name('struktur');


Route::get('/admin/kategori-bantuan', [KategoriBantuanController::class, 'index'])->name('kategori.bantuan');
Route::post('/admin/kategori-bantuan', [KategoriBantuanController::class, 'store'])->name('store.kategori.bantuan');
Route::put('/admin/kategori-bantuan/{id}', [KategoriBantuanController::class, 'update'])->name('update.kategori.bantuan');
Route::delete('/admin/kategori-bantuan/{id}', [KategoriBantuanController::class, 'delete'])->name('delete.kategori.bantuan');

Route::get('/admin/penerima-bantuan', [PenerimaBantuanController::class, 'index'])->name('penerima.bantuan');
Route::post('/admin/penerima-bantuan', [PenerimaBantuanController::class, 'store'])->name('store.penerima.bantuan');
Route::put('/admin/penerima-bantuan/{id}', [PenerimaBantuanController::class, 'update'])->name('update.penerima.bantuan');
Route::delete('/admin/penerima-bantuan/{id}', [PenerimaBantuanController::class, 'delete'])->name('delete.penerima.bantuan');

Route::get('/admin/stanting', [StantingController::class, 'index'])->name('stanting');
Route::post('/admin/stanting', [StantingController::class, 'store'])->name('store.stanting');
Route::put('/admin/stanting/{id}', [StantingController::class, 'update'])->name('update.stanting');
Route::delete('/admin/stanting/{id}', [StantingController::class, 'delete'])->name('delete.stanting');

Route::get('/admin/apbdes', [ApbdesController::class, 'index'])->name('apbdes');
Route::post('/admin/apbdes', [ApbdesController::class, 'store'])->name('store.apbdes');
Route::get('/admin/apbdes/{id}', [ApbdesController::class, 'show'])->name('show.apbdes');
Route::put('/admin/apbdes/{id}', [ApbdesController::class, 'update'])->name('update.apbdes');
Route::delete('/admin/apbdes/{id}', [ApbdesController::class, 'delete'])->name('delete.apbdes');

Route::post('/admin/apbdes/{apbdesId}/pendapatan', [ApbdesController::class, 'storePendapatan'])->name('store.pendapatan');
Route::put('/admin/apbdes/{apbdesId}/pendapatan/{pendapatanId}', [ApbdesController::class, 'updatePendapatan'])->name('update.pendapatan');
Route::delete('/admin/apbdes/{apbdesId}/pendapatan/{pendapatanId}', [ApbdesController::class, 'deletePendapatan'])->name('delete.pendapatan');

Route::post('/admin/apbdes/{apbdesId}/belanja', [ApbdesController::class, 'storeBelanja'])->name('store.belanja');
Route::put('/admin/apbdes/{apbdesId}/belanja/{belanjaId}', [ApbdesController::class, 'updateBelanja'])->name('update.belanja');
Route::delete('/admin/apbdes/{apbdesId}/belanja/{belanjaId}', [ApbdesController::class, 'deleteBelanja'])->name('delete.belanja');

Route::get('/profildesa', [PrfildesaController::class, 'index'])->name('profildesa');
Route::get('/infografis', [InfografisController::class, 'index'])->name('infografis');

// Route::get('/desa', function () {
//     return Inertia::render('App/Village');
// });





require __DIR__ . '/auth.php';
