<?php

use App\Http\Controllers\admin\DusunController;
use App\Http\Controllers\admin\HomeController;
use App\Http\Controllers\admin\JabatanController;
use App\Http\Controllers\admin\KepalaDusunController;
use App\Http\Controllers\admin\PegawaiController;
use App\Http\Controllers\admin\BeritaController;
use App\Http\Controllers\admin\GalleryController;
use App\Http\Controllers\admin\ProfilDesaController;
use App\Http\Controllers\admin\UmkmController;
use App\Http\Controllers\admin\KontakLayananController;
use App\Http\Controllers\app\HomeController as AppHomeController;
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

// Route::get('/desa', function () {
//     return Inertia::render('App/Village');
// });





require __DIR__ . '/auth.php';
