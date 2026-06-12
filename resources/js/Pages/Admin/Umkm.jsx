import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nama_usaha: '',
    alamat: '',
    keterangan: '',
    nohp: '',
    foto1: null,
    foto2: null,
    foto3: null,
};

export default function Umkm({ umkm }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingItem(null);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        resetForm();
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setForm({
            nama_usaha: item.nama_usaha || '',
            alamat: item.alamat || '',
            keterangan: item.keterangan || '',
            nohp: item.nohp || '',
            foto1: null,
            foto2: null,
            foto3: null,
        });
        setIsEditModalOpen(true);
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setForm((current) => ({
            ...current,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);

        const options = {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => closeModals(),
        };

        if (editingItem) {
            router.post(`/admin/umkm/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/umkm', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus UMKM?',
            text: `UMKM "${item.nama_usaha}" akan dihapus permanen`,
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
                router.delete(`/admin/umkm/${item.id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const renderModal = (title) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-base-100 shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    </div>
                    <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">
                        X
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Nama Usaha</span>
                            <input
                                type="text"
                                name="nama_usaha"
                                value={form.nama_usaha}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nama usaha"
                            />
                            {errors.nama_usaha && (
                                <span className="mt-1 text-sm text-error">{errors.nama_usaha}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">No. HP</span>
                            <input
                                type="text"
                                name="nohp"
                                value={form.nohp}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nomor HP"
                            />
                            {errors.nohp && (
                                <span className="mt-1 text-sm text-error">{errors.nohp}</span>
                            )}
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Alamat</span>
                        <input
                            type="text"
                            name="alamat"
                            value={form.alamat}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Alamat usaha"
                        />
                        {errors.alamat && (
                            <span className="mt-1 text-sm text-error">{errors.alamat}</span>
                        )}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Keterangan</span>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            name="keterangan"
                            value={form.keterangan}
                            placeholder="Deskripsi UMKM"
                            onChange={handleChange}
                            rows={4}
                        />
                        {errors.keterangan && (
                            <span className="mt-1 text-sm text-error">{errors.keterangan}</span>
                        )}
                    </label>

                    <div className="grid gap-4 md:grid-cols-3">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">
                                Foto 1 {editingItem ? '(kosongkan jika tidak diganti)' : ''}
                            </span>
                            <input
                                type="file"
                                name="foto1"
                                onChange={handleChange}
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.foto1 && (
                                <span className="mt-1 text-sm text-error">{errors.foto1}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">
                                Foto 2 {editingItem ? '(kosongkan jika tidak diganti)' : ''}
                            </span>
                            <input
                                type="file"
                                name="foto2"
                                onChange={handleChange}
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.foto2 && (
                                <span className="mt-1 text-sm text-error">{errors.foto2}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">
                                Foto 3 {editingItem ? '(kosongkan jika tidak diganti)' : ''}
                            </span>
                            <input
                                type="file"
                                name="foto3"
                                onChange={handleChange}
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.foto3 && (
                                <span className="mt-1 text-sm text-error">{errors.foto3}</span>
                            )}
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing
                                ? 'Menyimpan...'
                                : editingItem
                                    ? 'Simpan Perubahan'
                                    : 'Tambah UMKM'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: 'Berhasil',
                text: flash.success,
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
            });
        }
        if (flash.error) {
            Swal.fire({
                title: 'Gagal',
                text: flash.error,
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-error text-white',
                },
            });
        }
    }, [flash]);

    return (
        <AdminLayout>
            <Head title="UMKM" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">UMKM</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola data UMKM (foto usaha, nama, alamat, keterangan, nohp).</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah UMKM
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Nama Usaha</th>
                                    <th>Alamat</th>
                                    <th>No. HP</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {umkm.length > 0 ? (
                                    umkm.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    {[item.foto1, item.foto2, item.foto3].map((f, i) => (
                                                        <div key={i} className="h-16 w-20 overflow-hidden rounded-lg bg-base-200">
                                                            {f ? (
                                                                <img
                                                                    src={f}
                                                                    alt={`Foto ${i + 1} ${item.nama_usaha}`}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                                                                    No
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>{item.nama_usaha}</td>
                                            <td>{item.alamat}</td>
                                            <td>{item.nohp}</td>
                                            <td className="max-w-xs">
                                                {item.keterangan ? (item.keterangan.length > 120 ? item.keterangan.slice(0, 120) + '...' : item.keterangan) : '-'}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(item)}
                                                        className="btn btn-warning btn-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item)}
                                                        className="btn btn-error btn-sm text-white"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-8 text-center text-gray-500">
                                            Belum ada data UMKM.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah UMKM')}
            {isEditModalOpen && renderModal('Edit UMKM')}
        </AdminLayout>
    );
}
