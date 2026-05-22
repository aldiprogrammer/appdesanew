import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nama: '',
    nik: '',
    foto: null,
    id_dusun: '',
    tahun_kerja: '',
    tahun_akhir_kerja: '',
};

export default function Kepaladusun({ dusun = [], kadus = [] }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const selectedDusunName = useMemo(() => {
        return dusun.find((item) => String(item.id) === String(form.id_dusun))?.nama_dusun || '-';
    }, [dusun, form.id_dusun]);

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
            nama: item.nama || '',
            nik: item.nik || '',
            foto: null,
            id_dusun: item.id_dusun || '',
            tahun_kerja: item.tahun_kerja || '',
            tahun_akhir_kerja: item.tahun_akhir_kerja || '',
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
            router.post(`/admin/kepaladusun/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/kepaladusun', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus kepala dusun?',
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
                router.delete(`/admin/kepaladusun/${item.id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const renderModal = (title, subtitle) => (
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
                            <span className="label-text mb-2 font-medium">Nama</span>
                            <input
                                type="text"
                                name="nama"
                                value={form.nama}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nama kepala dusun"
                            />
                            {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">NIK</span>
                            <input
                                type="text"
                                name="nik"
                                value={form.nik}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nomor Induk Kependudukan"
                                maxLength="18"
                            />
                            {errors.nik && (
                                <span className="mt-1 text-sm text-error">{errors.nik}</span>
                            )}
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Dusun</span>
                        <select
                            name="id_dusun"
                            value={form.id_dusun}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Pilih dusun</option>
                            {dusun.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nama_dusun}
                                </option>
                            ))}
                        </select>
                        {errors.id_dusun && (
                            <span className="mt-1 text-sm text-error">{errors.id_dusun}</span>
                        )}
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Tahun Mulai Kerja</span>
                            <input
                                type="text"
                                name="tahun_kerja"
                                value={form.tahun_kerja}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Contoh: 2024"
                            />
                            {errors.tahun_kerja && (
                                <span className="mt-1 text-sm text-error">
                                    {errors.tahun_kerja}
                                </span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Tahun Akhir Kerja</span>
                            <input
                                type="text"
                                name="tahun_akhir_kerja"
                                value={form.tahun_akhir_kerja}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Contoh: 2029"
                            />
                            {errors.tahun_akhir_kerja && (
                                <span className="mt-1 text-sm text-error">
                                    {errors.tahun_akhir_kerja}
                                </span>
                            )}
                        </label>
                    </div>

                    <label className="form-control w-full">
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
    }, [flash.error, flash.success]);

    return (
        <AdminLayout>
            <Head title="Data Kepala Dusun" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Data Kepala Dusun</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola data kepala dusun beserta periode kerjanya.
                        </p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Kepala Dusun
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Nama</th>
                                    <th>NIK</th>
                                    <th>Dusun</th>
                                    <th>Periode</th>
                                    <th className="text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kadus.length > 0 ? (
                                    kadus.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="h-12 w-12 rounded-lg">
                                                        <img
                                                            src={item.foto}
                                                            alt={item.nama}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-medium">{item.nama}</td>
                                            <td>{item.nik}</td>
                                            <td>{item.dusun}</td>
                                            <td>
                                                {item.tahun_kerja} - {item.tahun_akhir_kerja}
                                            </td>
                                            <td>
                                                <div className="flex justify-end gap-2">
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
                                            Belum ada data kepala dusun.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen &&
                renderModal('Tambah Kepala Dusun', 'Masukkan data kepala dusun baru.')}

            {isEditModalOpen &&
                renderModal('Edit Kepala Dusun', 'Perbarui data kepala dusun yang dipilih.')}
        </AdminLayout>
    );
}
