import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nik: '',
    nama: '',
    dusun_id: '',
    kategori_bantuan_id: '',
    keterangan: '',
};

export default function PenerimaBantuan({ penerima, dusun, kategori }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [filterKategori, setFilterKategori] = useState('');

    const filtered = useMemo(() => {
        if (!filterKategori) return penerima;
        return penerima.filter((item) => item.kategori_bantuan_id == filterKategori);
    }, [penerima, filterKategori]);

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
            kategori_bantuan_id: item.kategori_bantuan_id || '',
            keterangan: item.keterangan || '',
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
            router.post(`/admin/penerima-bantuan/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/penerima-bantuan', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus penerima bantuan?',
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
                router.delete(`/admin/penerima-bantuan/${item.id}`, {
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
                            <span className="label-text mb-2 font-medium">NIK</span>
                            <input
                                type="text"
                                name="nik"
                                value={form.nik}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="NIK penerima"
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

                        <label className="form-control w-full">
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

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kategori Bantuan</span>
                            <select
                                name="kategori_bantuan_id"
                                value={form.kategori_bantuan_id}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih Kategori</option>
                                {kategori.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nama_bantuan}
                                    </option>
                                ))}
                            </select>
                            {errors.kategori_bantuan_id && (
                                <span className="mt-1 text-sm text-error">{errors.kategori_bantuan_id}</span>
                            )}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Keterangan</span>
                            <textarea
                                name="keterangan"
                                value={form.keterangan}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full"
                                placeholder="Keterangan (opsional)"
                                rows={3}
                            />
                            {errors.keterangan && (
                                <span className="mt-1 text-sm text-error">{errors.keterangan}</span>
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
            <Head title="Penerima Bantuan" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Penerima Bantuan</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola warga penerima bantuan berdasarkan kategori.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Penerima
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Filter Kategori:</span>
                    <select
                        value={filterKategori}
                        onChange={(e) => setFilterKategori(e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Semua Kategori</option>
                        {kategori.map((item) => (
                            <option key={item.id} value={item.id}>{item.nama_bantuan}</option>
                        ))}
                    </select>
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
                                    <th>Kategori Bantuan</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td className="font-mono text-sm">{item.nik}</td>
                                            <td className="font-medium">{item.nama}</td>
                                            <td>{item.dusun?.nama_dusun || '-'}</td>
                                            <td>
                                                <span className="badge badge-primary badge-outline">
                                                    {item.kategori_bantuan?.nama_bantuan || '-'}
                                                </span>
                                            </td>
                                            <td className="max-w-[200px] truncate text-sm text-gray-500">
                                                {item.keterangan || '-'}
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
                                            {penerima.length === 0
                                                ? 'Belum ada data penerima bantuan.'
                                                : 'Tidak ada penerima dengan filter kategori ini.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Penerima Bantuan')}
            {isEditModalOpen && renderModal('Edit Penerima Bantuan')}
        </AdminLayout>
    );
}
