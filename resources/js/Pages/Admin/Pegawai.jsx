import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nama: '',
    nik: '',
    nip: '',
    jabatan: '',
    nohp: '',
    alamat: '',
    foto: null,
};

export default function Pegawai({ pegawai, jabatan }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const selectedJabatanName = useMemo(() => {
        return jabatan.find((item) => String(item.id) === String(form.jabatan))?.jabatan || '-';
    }, [jabatan, form.jabatan]);

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
            nip: item.nip || '',
            jabatan: item.id_jabatan || '',
            nohp: item.nohp || '',
            alamat: item.alamat || '',
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
            router.post(`/admin/pegawai/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/pegawai', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus pegawai?',
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
                router.delete(`/admin/pegawai/${item.id}`, {
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
                            <span className="label-text mb-2 font-medium">Nama</span>
                            <input
                                type="text"
                                name="nama"
                                value={form.nama}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Nama pegawai"
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
                                placeholder="NIK pegawai"
                                maxLength="18"
                            />
                            {errors.nik && (
                                <span className="mt-1 text-sm text-error">{errors.nik}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">NIP</span>
                            <input
                                type="text"
                                name="nip"
                                value={form.nip}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="NIP pegawai"
                                maxLength="30"
                            />
                            {errors.nip && (
                                <span className="mt-1 text-sm text-error">{errors.nip}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">No HP</span>
                            <input
                                type="text"
                                name="nohp"
                                value={form.nohp}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="No HP pegawai"
                                maxLength="18"
                            />
                            {errors.nohp && (
                                <span className="mt-1 text-sm text-error">{errors.nohp}</span>
                            )}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Alamat</span>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                name="alamat"
                                value={form.alamat}
                                placeholder="Alamat pegawai"
                                onChange={handleChange}
                                rows={3}
                            />
                            {errors.alamat && (
                                <span className="mt-1 text-sm text-error">{errors.alamat}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Jabatan</span>
                            <select
                                name="jabatan"
                                value={form.jabatan}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">-- Pilih Jabatan --</option>
                                {jabatan.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.jabatan}
                                    </option>
                                ))}
                            </select>
                            {errors.jabatan && (
                                <span className="mt-1 text-sm text-error">{errors.jabatan}</span>
                            )}
                        </label>

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
                    </div>

                    <div className="rounded-lg border border-base-300 bg-base-200 p-4">
                        <p className="text-sm text-gray-500">Jabatan terpilih</p>
                        <p className="font-semibold text-gray-900">{selectedJabatanName}</p>
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
            <Head title="Data Pegawai" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Data Pegawai</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola data pegawai dan unggah foto.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Pegawai
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
                                    <th>NIP</th>
                                    <th>Jabatan</th>
                                    <th>No HP</th>
                                    <th>Alamat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pegawai.length > 0 ? (
                                    pegawai.map((item, index) => (
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
                                            <td>{item.nip}</td>
                                            <td>{item.jb?.jabatan}</td>
                                            <td>{item.nohp}</td>
                                            <td>{item.alamat}</td>
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
                                        <td colSpan="9" className="py-8 text-center text-gray-500">
                                            Belum ada data pegawai.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Pegawai')}
            {isEditModalOpen && renderModal('Edit Pegawai')}
        </AdminLayout>
    );
}
