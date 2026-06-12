import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nik: '',
    nama: '',
    dusun_id: '',
};

export default function Stanting({ stanting, dusun }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const selectedDusunName = useMemo(() => {
        return dusun.find((item) => String(item.id) === String(form.dusun_id))?.nama_dusun || '-';
    }, [dusun, form.dusun_id]);

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
            nik: item.nik || '',
            nama: item.nama || '',
            dusun_id: item.dusun_id || '',
        });
        setIsEditModalOpen(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);

        const options = {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => closeModals(),
        };

        if (editingItem) {
            router.post(`/admin/stanting/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/stanting', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus data stanting?',
            text: `Data "${item.nama}" akan dihapus permanen.`,
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
                router.delete(`/admin/stanting/${item.id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const renderModal = (title) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg bg-base-100 shadow-xl">
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
                            <span className="label-text mb-2 font-medium">NIK</span>
                            <input
                                type="text"
                                name="nik"
                                value={form.nik}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="NIK"
                                maxLength="20"
                            />
                            {errors.nik && (
                                <span className="mt-1 text-sm text-error">{errors.nik}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Nama</span>
                            <input
                                type="text"
                                name="nama"
                                value={form.nama}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nama lengkap"
                            />
                            {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Dusun</span>
                            <select
                                name="dusun_id"
                                value={form.dusun_id}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih Dusun</option>
                                {dusun.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nama_dusun}
                                    </option>
                                ))}
                            </select>
                            {errors.dusun_id && (
                                <span className="mt-1 text-sm text-error">{errors.dusun_id}</span>
                            )}
                        </label>
                    </div>

                    <div className="rounded-lg border border-base-300 bg-base-200 p-4">
                        <p className="text-sm text-gray-500">Dusun terpilih</p>
                        <p className="font-semibold text-gray-900">{selectedDusunName}</p>
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
                                    : 'Tambah Data'}
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
            <Head title="Data Stanting" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Data Stanting</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola data anak stanting berdasarkan dusun.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Data
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIK</th>
                                    <th>Nama</th>
                                    <th>Dusun</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stanting.length > 0 ? (
                                    stanting.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td className="font-mono text-sm">{item.nik}</td>
                                            <td className="font-medium">{item.nama}</td>
                                            <td>{item.dusun?.nama_dusun || '-'}</td>
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
                                            Belum ada data stanting.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Data Stanting')}
            {isEditModalOpen && renderModal('Edit Data Stanting')}
        </AdminLayout>
    );
}
