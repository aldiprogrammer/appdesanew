<?php

use App\Http\Controllers\admin\DusunController;
use App\Http\Controllers\admin\PendudukController;
use App\Http\Controllers\admin\SuratController as AdminSuratController;
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
use App\Http\Controllers\admin\PengaduanController;
use App\Http\Controllers\admin\AdminUserController;
use App\Http\Controllers\admin\Auth\AdminAuthController;
use App\Http\Controllers\app\HomeController as AppHomeController;
use App\Http\Controllers\app\PrfildesaController;
use App\Http\Controllers\app\InfografisController;
use App\Http\Controllers\app\StrukturController;
use App\Http\Controllers\app\ApbdesController as AppApbdesController;
use App\Http\Controllers\app\KontakLayananController as AppKontakLayananController;
use App\Http\Controllers\app\SuratAuthController;
use App\Http\Controllers\app\SuratController;
use App\Http\Controllers\app\PengaduanController as AppPengaduanController;
use App\Http\Controllers\app\UmkmController as AppUmkmController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [AppHomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Admin login routes (public)
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login.attempt');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

// Protected admin routes
Route::middleware('admin.auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', [HomeController::class, 'index'])->name('admin.dashboard');

    Route::middleware('admin.permission:penduduk')->group(function () {
        Route::get('/penduduk', [PendudukController::class, 'index'])->name('penduduk');
        Route::post('/penduduk', [PendudukController::class, 'store'])->name('store.penduduk');
        Route::post('/penduduk/{id}', [PendudukController::class, 'update'])->name('update.penduduk');
        Route::delete('/penduduk/{id}', [PendudukController::class, 'delete'])->name('delete.penduduk');
    });

    Route::middleware('admin.permission:surat')->group(function () {
        Route::get('/surat', [AdminSuratController::class, 'index'])->name('admin.surat');
        Route::post('/surat/{id}', [AdminSuratController::class, 'update'])->name('update.surat');
        Route::delete('/surat/{id}', [AdminSuratController::class, 'delete'])->name('delete.surat');
        Route::get('/surat/download/{id}', [AdminSuratController::class, 'download'])->name('admin.surat.download');
    });

    Route::middleware('admin.permission:dusun')->group(function () {
        Route::get('/dusun', [DusunController::class, 'index'])->name('dusun');
        Route::post('/dusun', [DusunController::class, 'store'])->name('store.dusun');
        Route::put('/dusun/{id}', [DusunController::class, 'update'])->name('update.dusun');
        Route::delete('/dusun/{id}', [DusunController::class, 'delete'])->name('delete.dusun');
    });

    Route::middleware('admin.permission:kepaladusun')->group(function () {
        Route::get('/kepaladusun', [KepalaDusunController::class, 'index'])->name('kepaladusun');
        Route::post('/kepaladusun', [KepalaDusunController::class, 'store'])->name('store.kepaladusun');
        Route::post('/kepaladusun/{id}', [KepalaDusunController::class, 'update'])->name('update.kepaladusun');
        Route::delete('/kepaladusun/{id}', [KepalaDusunController::class, 'delete'])->name('delete.kepaladusun');
    });

    Route::middleware('admin.permission:jabatan')->group(function () {
        Route::get('/jabatan', [JabatanController::class, 'index'])->name('jabatan');
        Route::post('/jabatan', [JabatanController::class, 'store'])->name('store.jabatan');
        Route::put('/jabatan/{id}', [JabatanController::class, 'update'])->name('update.jabatan');
        Route::delete('/jabatan/{id}', [JabatanController::class, 'delete'])->name('delete.jabatan');
    });

    Route::middleware('admin.permission:berita')->group(function () {
        Route::get('/berita', [BeritaController::class, 'index'])->name('berita');
        Route::post('/berita', [BeritaController::class, 'store'])->name('store.berita');
        Route::post('/berita/{id}', [BeritaController::class, 'update'])->name('update.berita');
        Route::delete('/berita/{id}', [BeritaController::class, 'delete'])->name('delete.berita');
    });

    Route::middleware('admin.permission:gallery')->group(function () {
        Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
        Route::post('/gallery', [GalleryController::class, 'store'])->name('store.gallery');
        Route::post('/gallery/{id}', [GalleryController::class, 'update'])->name('update.gallery');
        Route::delete('/gallery/{id}', [GalleryController::class, 'delete'])->name('delete.gallery');
    });

    Route::middleware('admin.permission:profil-desa')->group(function () {
        Route::get('/profil-desa', [ProfilDesaController::class, 'index'])->name('profil.desa');
        Route::post('/profil-desa', [ProfilDesaController::class, 'store'])->name('store.profil.desa');
        Route::post('/profil-desa/{id}', [ProfilDesaController::class, 'update'])->name('update.profil.desa');
        Route::delete('/profil-desa/{id}', [ProfilDesaController::class, 'delete'])->name('delete.profil.desa');
    });

    Route::middleware('admin.permission:peta-desa')->group(function () {
        Route::get('/peta-desa', [PetaDesaController::class, 'index'])->name('peta.desa');
    });

    Route::middleware('admin.permission:pegawai')->group(function () {
        Route::get('/pegawai', [PegawaiController::class, 'index'])->name('pegawai');
        Route::post('/pegawai', [PegawaiController::class, 'store'])->name('store.pegawai');
        Route::post('/pegawai/{id}', [PegawaiController::class, 'update'])->name('update.pegawai');
        Route::delete('/pegawai/{id}', [PegawaiController::class, 'delete'])->name('delete.pegawai');
    });

    Route::middleware('admin.permission:umkm')->group(function () {
        Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm');
        Route::post('/umkm', [UmkmController::class, 'store'])->name('store.umkm');
        Route::post('/umkm/{id}', [UmkmController::class, 'update'])->name('update.umkm');
        Route::delete('/umkm/{id}', [UmkmController::class, 'delete'])->name('delete.umkm');
    });

    Route::middleware('admin.permission:kontak-layanan')->group(function () {
        Route::get('/kontak-layanan', [KontakLayananController::class, 'index'])->name('kontak.layanan');
        Route::post('/kontak-layanan', [KontakLayananController::class, 'store'])->name('store.kontak.layanan');
        Route::put('/kontak-layanan/{id}', [KontakLayananController::class, 'update'])->name('update.kontak.layanan');
        Route::delete('/kontak-layanan/{id}', [KontakLayananController::class, 'delete'])->name('delete.kontak.layanan');
    });

    Route::middleware('admin.permission:kategori-bantuan')->group(function () {
        Route::get('/kategori-bantuan', [KategoriBantuanController::class, 'index'])->name('kategori.bantuan');
        Route::post('/kategori-bantuan', [KategoriBantuanController::class, 'store'])->name('store.kategori.bantuan');
        Route::post('/kategori-bantuan/{id}', [KategoriBantuanController::class, 'update'])->name('update.kategori.bantuan');
        Route::delete('/kategori-bantuan/{id}', [KategoriBantuanController::class, 'delete'])->name('delete.kategori.bantuan');
    });

    Route::middleware('admin.permission:penerima-bantuan')->group(function () {
        Route::get('/penerima-bantuan', [PenerimaBantuanController::class, 'index'])->name('penerima.bantuan');
        Route::post('/penerima-bantuan', [PenerimaBantuanController::class, 'store'])->name('store.penerima.bantuan');
        Route::post('/penerima-bantuan/{id}', [PenerimaBantuanController::class, 'update'])->name('update.penerima.bantuan');
        Route::delete('/penerima-bantuan/{id}', [PenerimaBantuanController::class, 'delete'])->name('delete.penerima.bantuan');
    });

    Route::middleware('admin.permission:stanting')->group(function () {
        Route::get('/stanting', [StantingController::class, 'index'])->name('stanting');
        Route::post('/stanting', [StantingController::class, 'store'])->name('store.stanting');
        Route::post('/stanting/{id}', [StantingController::class, 'update'])->name('update.stanting');
        Route::delete('/stanting/{id}', [StantingController::class, 'delete'])->name('delete.stanting');
    });

    Route::middleware('admin.permission:apbdes')->group(function () {
        Route::get('/apbdes', [ApbdesController::class, 'index'])->name('apbdes');
        Route::post('/apbdes', [ApbdesController::class, 'store'])->name('store.apbdes');
        Route::get('/apbdes/{id}', [ApbdesController::class, 'show'])->name('show.apbdes');
        Route::put('/apbdes/{id}', [ApbdesController::class, 'update'])->name('update.apbdes');
        Route::delete('/apbdes/{id}', [ApbdesController::class, 'delete'])->name('delete.apbdes');

        Route::post('/apbdes/{apbdesId}/pendapatan', [ApbdesController::class, 'storePendapatan'])->name('store.pendapatan');
        Route::put('/apbdes/{apbdesId}/pendapatan/{pendapatanId}', [ApbdesController::class, 'updatePendapatan'])->name('update.pendapatan');
        Route::delete('/apbdes/{apbdesId}/pendapatan/{pendapatanId}', [ApbdesController::class, 'deletePendapatan'])->name('delete.pendapatan');

        Route::post('/apbdes/{apbdesId}/belanja', [ApbdesController::class, 'storeBelanja'])->name('store.belanja');
        Route::put('/apbdes/{apbdesId}/belanja/{belanjaId}', [ApbdesController::class, 'updateBelanja'])->name('update.belanja');
        Route::delete('/apbdes/{apbdesId}/belanja/{belanjaId}', [ApbdesController::class, 'deleteBelanja'])->name('delete.belanja');
    });

    Route::middleware('admin.permission:pengaduan')->group(function () {
        Route::get('/pengaduan', [PengaduanController::class, 'index'])->name('pengaduan');
        Route::post('/pengaduan', [PengaduanController::class, 'store'])->name('store.pengaduan');
        Route::post('/pengaduan/{id}', [PengaduanController::class, 'update'])->name('update.pengaduan');
        Route::delete('/pengaduan/{id}', [PengaduanController::class, 'delete'])->name('delete.pengaduan');
    });

    Route::middleware('admin.permission:admin-user')->group(function () {
        Route::get('/admin-user', [AdminUserController::class, 'index'])->name('admin.user');
        Route::post('/admin-user', [AdminUserController::class, 'store'])->name('store.admin.user');
        Route::put('/admin-user/{id}', [AdminUserController::class, 'update'])->name('update.admin.user');
        Route::delete('/admin-user/{id}', [AdminUserController::class, 'delete'])->name('delete.admin.user');
    });
});

Route::get('/desa', [AppHomeController::class, 'index'])->name('home');
Route::get('/berita', function () {
    $berita = \App\Models\Berita::where('status', 0)->latest()->get();
    return Inertia::render('App/BeritaList', compact('berita'));
})->name('berita.list');
Route::get('/berita/{id}', function ($id) {
    $berita = \App\Models\Berita::where('status', 0)->findOrFail($id);
    return Inertia::render('App/BeritaDetail', compact('berita'));
})->name('berita.detail');
Route::get('/struktur', [StrukturController::class, 'index'])->name('struktur');

Route::get('/profildesa', [PrfildesaController::class, 'index'])->name('profildesa');
Route::get('/infografis', [InfografisController::class, 'index'])->name('infografis');
Route::get('/apbdes', [AppApbdesController::class, 'index'])->name('apbdes.public');
Route::get('/kontak-layanan', [AppKontakLayananController::class, 'index'])->name('kontak.layanan.public');

Route::get('/umkm', [AppUmkmController::class, 'index'])->name('umkm.public');
Route::get('/umkm/{id}', [AppUmkmController::class, 'show'])->name('umkm.detail');

Route::get('/pengaduan', [AppPengaduanController::class, 'index'])->name('pengaduan');
Route::post('/pengaduan', [AppPengaduanController::class, 'store'])->name('pengaduan.store');
Route::post('/pengaduan/cek-status', [AppPengaduanController::class, 'cekStatus'])->name('pengaduan.cek');

// Route::get('/desa', function () {
//     return Inertia::render('App/Village');
// });





// Surat (Layanan Digital)
Route::get('/surat/login', [SuratAuthController::class, 'showLogin'])->name('surat.login');
Route::post('/surat/login', [SuratAuthController::class, 'login']);
Route::get('/surat/register', [SuratAuthController::class, 'showRegister'])->name('surat.register');
Route::post('/surat/register', [SuratAuthController::class, 'register']);
Route::post('/surat/logout', [SuratAuthController::class, 'logout'])->name('surat.logout');

Route::prefix('surat')->middleware(['auth', 'role:penduduk'])->group(function () {
    Route::get('/dashboard', [SuratController::class, 'dashboard'])->name('surat.dashboard');
    Route::get('/buat/{jenis}', [SuratController::class, 'create'])->name('surat.buat');
    Route::post('/buat', [SuratController::class, 'store'])->name('surat.store');
    Route::get('/riwayat', [SuratController::class, 'riwayat'])->name('surat.riwayat');
    Route::get('/download/{id}', [SuratController::class, 'download'])->name('surat.download');
});

require __DIR__ . '/auth.php';
