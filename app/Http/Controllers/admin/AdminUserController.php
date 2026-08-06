<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        $admins = Admin::latest()->get();

        return Inertia::render('Admin/AdminUser', [
            'admins' => $admins,
            'menus' => config('admin_menus'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string|max:100|unique:admins,username',
            'nama' => 'required|string|max:200',
            'email' => 'nullable|email|max:255',
            'password' => 'required|string|min:6',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        Admin::create([
            'username' => $data['username'],
            'nama' => $data['nama'],
            'email' => $data['email'] ?? null,
            'password' => $data['password'],
            'permissions' => $data['permissions'] ?? [],
        ]);

        return redirect()->back()->with('success', 'Admin berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $data = $request->validate([
            'username' => 'required|string|max:100|unique:admins,username,' . $id,
            'nama' => 'required|string|max:200',
            'email' => 'nullable|email|max:255',
            'password' => 'nullable|string|min:6',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        $admin->username = $data['username'];
        $admin->nama = $data['nama'];
        $admin->email = $data['email'] ?? null;

        if (!empty($data['password'])) {
            $admin->password = $data['password'];
        }

        if ($admin->id === Auth::guard('admin')->id()) {
            $admin->permissions = $admin->permissions ?? [];
        } else {
            $admin->permissions = $data['permissions'] ?? [];
        }

        $admin->update();

        return redirect()->back()->with('success', 'Admin berhasil diubah');
    }

    public function delete($id)
    {
        $admin = Admin::findOrFail($id);

        if ($admin->id === Auth::guard('admin')->id()) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun sendiri.');
        }

        $admin->delete();

        return redirect()->back()->with('success', 'Admin berhasil dihapus');
    }
}
