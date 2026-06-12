<?php

use App\Models\Penduduk;
use App\Models\User;
use App\Models\Surat;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Penduduk::create([
        'nik' => '1234567890123456',
        'no_kk' => '1234567890123456',
        'nama' => 'Warga Test',
        'sex' => '1',
        'dusun' => 'Dusun 1',
        'rt' => '001',
        'rw' => '001',
        'tempatlahir' => 'Jakarta',
        'tanggallahir' => '1990-01-01',
        'agama_id' => '1',
        'pekerjaan_id' => '6',
        'status_kawin' => '2',
        'kk_level' => '1',
        'nama_ayah' => 'Ayah Test',
        'nama_ibu' => 'Ibu Test',
        'alamat' => 'Jl. Test No. 1',
    ]);
});

// ─── Surat Auth ─────────────────────────────────────────────────

test('register with valid NIK creates user and redirects to dashboard', function () {
    $response = $this->post('/surat/register', [
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => 'rahasia123',
        'password_confirmation' => 'rahasia123',
    ]);

    $response->assertRedirect('/surat/dashboard');
    $this->assertDatabaseHas('users', [
        'nik' => '1234567890123456',
        'role' => 'penduduk',
    ]);
});

test('register with unregistered NIK fails', function () {
    $response = $this->post('/surat/register', [
        'nik' => '0000000000000000',
        'dusun' => 'Dusun 1',
        'password' => 'rahasia123',
        'password_confirmation' => 'rahasia123',
    ]);

    $response->assertSessionHasErrors('nik');
});

test('register with duplicate NIK fails', function () {
    User::create([
        'name' => 'Existing',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->post('/surat/register', [
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => 'rahasia123',
        'password_confirmation' => 'rahasia123',
    ]);

    $response->assertSessionHasErrors('nik');
});

test('login with correct credentials redirects to dashboard', function () {
    User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->post('/surat/login', [
        'nik' => '1234567890123456',
        'password' => 'rahasia123',
    ]);

    $response->assertRedirect('/surat/dashboard');
    $this->assertAuthenticated();
});

test('login with wrong password fails', function () {
    User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->post('/surat/login', [
        'nik' => '1234567890123456',
        'password' => 'salah',
    ]);

    $response->assertSessionHasErrors('nik');
});

test('logout invalidates session and redirects to login', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $this->actingAs($user)->post('/surat/logout');

    $this->assertGuest();
});

// ─── Surat CRUD ─────────────────────────────────────────────────

test('unauthenticated user is redirected to login', function () {
    $this->get('/surat/dashboard')->assertRedirect('/login');
    $this->get('/surat/buat/domisili')->assertRedirect('/login');
    $this->get('/surat/riwayat')->assertRedirect('/login');
});

test('dashboard shows user data and letter types', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->get('/surat/dashboard');

    $response->assertInertia(fn ($page) => $page
        ->component('Surat/Dashboard')
        ->has('user')
        ->has('penduduk')
        ->has('surats')
        ->has('jenisList')
    );
});

test('create page renders for valid jenis', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->get('/surat/buat/domisili');

    $response->assertInertia(fn ($page) => $page
        ->component('Surat/BuatSurat')
        ->where('jenis', 'domisili')
    );
});

test('create page redirects for invalid jenis', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->get('/surat/buat/invalid');

    $response->assertRedirect('/surat/dashboard');
});

test('can create domisili letter', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->post('/surat/buat', [
        'jenis' => 'domisili',
        'alamat_domisili' => 'Jl. Baru No. 5',
        'rt' => '002',
        'rw' => '003',
        'keperluan' => 'Pembuatan KTP',
    ]);

    $response->assertRedirect('/surat/riwayat');
    $this->assertDatabaseHas('surats', [
        'user_id' => $user->id,
        'jenis' => 'domisili',
        'status' => 'pending',
    ]);
});

test('can create tidak_mampu letter', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->post('/surat/buat', [
        'jenis' => 'tidak_mampu',
    ]);

    $response->assertRedirect('/surat/riwayat');
    $this->assertDatabaseHas('surats', ['jenis' => 'tidak_mampu']);
});

test('can create usaha letter', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->post('/surat/buat', [
        'jenis' => 'usaha',
        'nama_usaha' => 'Toko Sembako',
        'bidang_usaha' => 'Perdagangan',
        'alamat_usaha' => 'Pasar Induk',
    ]);

    $response->assertRedirect('/surat/riwayat');
    $this->assertDatabaseHas('surats', ['jenis' => 'usaha']);
});

test('can create belum_menikah letter', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->post('/surat/buat', [
        'jenis' => 'belum_menikah',
        'keperluan_surat' => 'Melamar pekerjaan',
    ]);

    $response->assertRedirect('/surat/riwayat');
    $this->assertDatabaseHas('surats', ['jenis' => 'belum_menikah']);
});

test('can create pindah letter', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->post('/surat/buat', [
        'jenis' => 'pindah',
        'alamat_tujuan' => 'Jl. Merdeka No. 10',
        'alasan_pindah' => 'Ikut suami',
    ]);

    $response->assertRedirect('/surat/riwayat');
    $this->assertDatabaseHas('surats', ['jenis' => 'pindah']);
});

test('store validates required fields per jenis', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $response = $this->actingAs($user)->post('/surat/buat', [
        'jenis' => 'domisili',
        // missing alamat_domisili
    ]);

    $response->assertSessionHasErrors('alamat_domisili');
});

test('riwayat shows paginated surat list', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    Surat::create([
        'user_id' => $user->id,
        'jenis' => 'domisili',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test'],
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)->get('/surat/riwayat');

    $response->assertInertia(fn ($page) => $page
        ->component('Surat/Riwayat')
        ->has('surats.data', 1)
        ->has('jenisList')
    );
});

// ─── Admin Surat Management ─────────────────────────────────────

test('admin can view surat index with filters', function () {
    $admin = User::create([
        'name' => 'Admin',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);

    $warga = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    Surat::create([
        'user_id' => $warga->id,
        'jenis' => 'domisili',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test'],
        'status' => 'pending',
    ]);

    $response = $this->actingAs($admin)->get('/admin/surat');

    $response->assertInertia(fn ($page) => $page
        ->component('Admin/Surat')
        ->has('surats.data', 1)
        ->has('jenisList')
    );
});

test('admin can update surat status', function () {
    $admin = User::create([
        'name' => 'Admin',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);

    $warga = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $surat = Surat::create([
        'user_id' => $warga->id,
        'jenis' => 'domisili',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test'],
        'status' => 'pending',
    ]);

    $response = $this->actingAs($admin)->post("/admin/surat/{$surat->id}", [
        'status' => 'diproses',
        'keterangan' => 'Sedang diproses oleh admin',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('surats', [
        'id' => $surat->id,
        'status' => 'diproses',
        'keterangan' => 'Sedang diproses oleh admin',
    ]);
});

test('download surat fails if status is not selesai', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $surat = Surat::create([
        'user_id' => $user->id,
        'jenis' => 'domisili',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test', 'alamat_domisili' => 'Jl. Test'],
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)->get("/surat/download/{$surat->id}");
    $response->assertRedirect();
});

test('download surat returns PDF for completed surat', function () {
    $user = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $surat = Surat::create([
        'user_id' => $user->id,
        'jenis' => 'domisili',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test', 'alamat_domisili' => 'Jl. Baru No.5', 'rt' => '002', 'rw' => '003'],
        'status' => 'selesai',
    ]);

    $response = $this->actingAs($user)->get("/surat/download/{$surat->id}");

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'application/pdf');
});

test('admin can download any surat', function () {
    $admin = User::create([
        'name' => 'Admin',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);

    $warga = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $surat = Surat::create([
        'user_id' => $warga->id,
        'jenis' => 'usaha',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test', 'nama_usaha' => 'Toko Sembako'],
        'status' => 'selesai',
    ]);

    $response = $this->actingAs($admin)->get("/admin/surat/download/{$surat->id}");
    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'application/pdf');
});

test('admin can delete surat', function () {
    $admin = User::create([
        'name' => 'Admin',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);

    $warga = User::create([
        'name' => 'Warga Test',
        'nik' => '1234567890123456',
        'dusun' => 'Dusun 1',
        'password' => bcrypt('rahasia123'),
        'role' => 'penduduk',
    ]);

    $surat = Surat::create([
        'user_id' => $warga->id,
        'jenis' => 'domisili',
        'data' => ['nik' => '1234567890123456', 'nama' => 'Warga Test'],
        'status' => 'pending',
    ]);

    $response = $this->actingAs($admin)->delete("/admin/surat/{$surat->id}");

    $response->assertRedirect();
    $this->assertDatabaseMissing('surats', ['id' => $surat->id]);
});
