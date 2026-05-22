<?php

use App\Http\Controllers\admin\DusunController;
use App\Http\Controllers\admin\HomeController;
use App\Http\Controllers\admin\JabatanController;
use App\Http\Controllers\admin\KepalaDusunController;
use App\Http\Controllers\admin\PegawaiController;
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

Route::get('/admin/pegawai', [PegawaiController::class, 'index'])->name('pegawai');
Route::post('/admin/pegawai', [PegawaiController::class, 'store'])->name('store.pegawai');
Route::put('/admin/pegawai/{id}', [PegawaiController::class, 'update'])->name('update.pegawai');
Route::delete('/admin/pegawai/{id}', [PegawaiController::class, 'delete'])->name('delete.pegawai');







require __DIR__ . '/auth.php';
