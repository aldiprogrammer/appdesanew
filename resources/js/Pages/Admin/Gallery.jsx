import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nama_kegiatan: '',
    tanggal: '',
    foto: null,
};

export default function Gallery({ gallery }) {
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
            nama_kegiatan: item.nama_kegiatan || '',
            tanggal: item.tanggal || '',
            foto: null,
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
            router.post(`/admin/gallery/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/gallery', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus foto gallery?',
            text: `Foto "${item.nama_kegiatan}" akan dihapus permanen.`,
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
                router.delete(`/admin/gallery/${item.id}`, {
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
                            <span className="label-text mb-2 font-medium">Nama Kegiatan</span>
                            <input
                                type="text"
                                name="nama_kegiatan"
                                value={form.nama_kegiatan}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nama kegiatan"
                            />
                            {errors.nama_kegiatan && (
                                <span className="mt-1 text-sm text-error">{errors.nama_kegiatan}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Tanggal</span>
                            <input
                                type="date"
                                name="tanggal"
                                value={form.tanggal}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            {errors.tanggal && (
                                <span className="mt-1 text-sm text-error">{errors.tanggal}</span>
                            )}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">
                                Foto {editingItem ? '(kosongkan jika tidak diganti)' : ''}
                            </span>
                            <input
                                type="file"
                                name="foto"
                                onChange={handleChange}
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.foto && (
                                <span className="mt-1 text-sm text-error">{errors.foto}</span>
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
                                    : 'Tambah Foto'}
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
            <Head title="Galeri" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Galeri</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola foto galeri kegiatan.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Foto
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gallery.length > 0 ? (
                                    gallery.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="h-20 w-28 overflow-hidden rounded-lg bg-base-200">
                                                        {item.foto ? (
                                                            <img
                                                                src={item.foto}
                                                                alt={item.nama_kegiatan}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-xs text-gray-500">
                                                                No image
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.nama_kegiatan}</td>
                                            <td>{item.tanggal}</td>
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
                                        <td colSpan="5" className="py-8 text-center text-gray-500">
                                            Belum ada data gallery.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Foto')}
            {isEditModalOpen && renderModal('Edit Foto')}
        </AdminLayout>
    );
}
