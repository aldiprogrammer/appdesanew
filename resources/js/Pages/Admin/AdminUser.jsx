import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function AdminUser({ admins, menus }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        username: '',
        nama: '',
        email: '',
        password: '',
        permissions: [],
    })

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const togglePermission = (key) => {
        const current = data.permissions || [];
        const next = current.includes(key)
            ? current.filter(p => p !== key)
            : [...current, key];
        setData('permissions', next);
    }

    const toggleAll = (checked) => {
        setData('permissions', checked ? menus.map(m => m.key) : []);
    }

    const openCreateModal = () => {
        reset();
        setIsCreateModalOpen(true);
    }

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            put('/admin/admin-user/' + editingItem.id, {
                onSuccess: () => {
                    reset();
                    closeModals();
                }
            })
        } else {
            post('/admin/admin-user', {
                onSuccess: () => {
                    reset();
                    closeModals();
                }
            })
        }
    }

    const openEditModal = (item) => {
        setEditingItem(item);
        setData({
            username: item.username,
            nama: item.nama,
            email: item.email || '',
            password: '',
            permissions: item.permissions || [],
        });
        setIsEditModalOpen(true);
    }

    const hapus = (item) => {
        Swal.fire({
            title: 'Hapus admin?',
            text: `Akun "${item.username}" akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                actions: 'flex gap-3',
                confirmButton: 'btn btn-error text-white',
                cancelButton: 'btn btn-neutral text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/admin/admin-user/${item.id}`, {
                    onSuccess: () => {
                        reset();
                    }
                });
            }
        });
    };

    const renderPermissionCheckboxes = () => (
        <div className="rounded-lg border border-base-300 p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="label-text font-medium">Hak Akses Menu</span>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={(data.permissions || []).length === menus.length}
                        onChange={(e) => toggleAll(e.target.checked)}
                    />
                    Pilih Semua
                </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {menus.map((menu) => (
                    <label
                        key={menu.key}
                        className="flex items-center gap-2 rounded-lg border border-base-300 px-3 py-2 cursor-pointer hover:bg-base-200"
                    >
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm"
                            checked={(data.permissions || []).includes(menu.key)}
                            onChange={() => togglePermission(menu.key)}
                        />
                        <span className="text-sm">{menu.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    const renderModal = (title, subtitle) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-base-100 shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                    </div>
                    <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">
                        X
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Username</span>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Username"
                            />
                            {errors.username && (
                                <span className="mt-1 text-sm text-error">{errors.username}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Nama Lengkap</span>
                            <input
                                type="text"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama lengkap admin"
                            />
                            {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Email</span>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Email (opsional)"
                            />
                            {errors.email && (
                                <span className="mt-1 text-sm text-error">{errors.email}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">
                                Password {editingItem && '(kosongkan jika tidak diganti)'}
                            </span>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Password minimal 6 karakter"
                            />
                            {errors.password && (
                                <span className="mt-1 text-sm text-error">{errors.password}</span>
                            )}
                        </label>
                    </div>

                    {renderPermissionCheckboxes()}

                    {editingItem && (
                        <p className="text-xs text-gray-500">
                            Catatan: Hak akses akun Anda sendiri tidak dapat diubah.
                        </p>
                    )}

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing
                                ? 'Menyimpan...'
                                : editingItem
                                    ? 'Simpan Perubahan'
                                    : 'Tambah Admin'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Manajemen Admin</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola pengguna admin dan hak aksesnya.
                        </p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Admin
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Hak Akses</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="font-medium">{item.username}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.email || '-'}</td>
                                        <td>
                                            {item.permissions === null ? (
                                                <span className="badge badge-success badge-sm">Semua Menu</span>
                                            ) : (
                                                <span className="badge badge-primary badge-sm">
                                                    {item.permissions.length} Menu
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <button className='btn btn-warning btn-sm' onClick={() => openEditModal(item)}>Edit</button>
                                            {" "}
                                            <button className='btn btn-error btn-sm' onClick={() => hapus(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen &&
                renderModal('Tambah Admin', 'Masukkan data admin dan centang hak akses menu.')}

            {isEditModalOpen && renderModal('Edit Admin', 'Ubah data admin dan hak akses menu.')}
        </AdminLayout>
    )
}
