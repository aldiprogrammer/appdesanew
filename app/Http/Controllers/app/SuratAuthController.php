<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Penduduk;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SuratAuthController extends Controller
{
    function showLogin()
    {
        if (Auth::check() && Auth::user()->role === 'penduduk') {
            return redirect('/surat/dashboard');
        }
        return Inertia::render('Surat/Login');
    }

    function login(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:25',
            'password' => 'required|string',
        ]);

        $user = User::where('nik', $request->nik)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'nik' => 'NIK atau password salah.',
            ]);
        }

        Auth::login($user, $request->boolean('remember'));

        return redirect()->intended('/surat/dashboard');
    }

    function showRegister()
    {
        if (Auth::check() && Auth::user()->role === 'penduduk') {
            return redirect('/surat/dashboard');
        }
        $dusunList = Penduduk::select('dusun')->distinct()->orderBy('dusun')->pluck('dusun');
        return Inertia::render('Surat/Register', compact('dusunList'));
    }

    function register(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:25',
            'dusun' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $penduduk = Penduduk::where('nik', $request->nik)->first();
        if (!$penduduk) {
            throw ValidationException::withMessages([
                'nik' => 'NIK tidak terdaftar di data penduduk desa.',
            ]);
        }

        if (User::where('nik', $request->nik)->exists()) {
            throw ValidationException::withMessages([
                'nik' => 'NIK sudah terdaftar. Silakan login.',
            ]);
        }

        $user = User::create([
            'name' => $penduduk->nama,
            'nik' => $request->nik,
            'dusun' => $request->dusun,
            'password' => Hash::make($request->password),
            'role' => 'penduduk',
        ]);

        Auth::login($user);

        return redirect('/surat/dashboard');
    }

    function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/surat/login');
    }
}
