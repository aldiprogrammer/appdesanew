import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    judul: '',
    keterangan: '',
    tanggal_posting: '',
    status: '0',
    foto: null,
};

export default function Berita({ berita }) {
    const { flash = {}, errors = {} } = usePage().props;

    const truncate = (text, length = 140) => {
        if (!text) return '';
        const plain = String(text).replace(/<[^>]*>/g, '');
        return plain.length > length ? `${plain.slice(0, length)}...` : plain;
    };

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
            judul: item.judul || '',
            keterangan: item.keterangan || '',
            tanggal_posting: item.tanggal_posting || '',
            status: String(item.status),
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
            router.post(`/admin/berita/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/berita', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus berita?',
            text: `Berita "${item.judul}" akan dihapus permanen.`,
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
                router.delete(`/admin/berita/${item.id}`, {
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
                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Judul</span>
                        <input
                            type="text"
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Judul berita"
                        />
                        {errors.judul && (
                            <span className="mt-1 text-sm text-error">{errors.judul}</span>
                        )}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Keterangan</span>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            name="keterangan"
                            value={form.keterangan}
                            placeholder="Deskripsi berita"
                            onChange={handleChange}
                            rows={4}
                        />
                        {errors.keterangan && (
                            <span className="mt-1 text-sm text-error">{errors.keterangan}</span>
                        )}
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Tanggal Posting</span>
                            <input
                                type="date"
                                name="tanggal_posting"
                                value={form.tanggal_posting}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            {errors.tanggal_posting && (
                                <span className="mt-1 text-sm text-error">
                                    {errors.tanggal_posting}
                                </span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Status</span>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="0">Aktif</option>
                                <option value="1">Tidak Aktif</option>
                            </select>
                            {errors.status && (
                                <span className="mt-1 text-sm text-error">{errors.status}</span>
                            )}
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">
                            Foto Berita {editingItem ? '(kosongkan jika tidak diganti)' : ''}
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

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing
                                ? 'Menyimpan...'
                                : editingItem
                                    ? 'Simpan Perubahan'
                                    : 'Tambah Berita'}
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
            <Head title="Data Berita" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Data Berita</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola berita, unggah foto, dan atur status tampil.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Berita
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Judul</th>
                                    <th>Tanggal</th>
                                    <th>Status</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {berita.length > 0 ? (
                                    berita.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="h-16 w-24 overflow-hidden rounded-lg bg-base-200">
                                                        {item.foto ? (
                                                            <img
                                                                src={item.foto}
                                                                alt={item.judul}
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
                                            <td className="font-medium">{item.judul}</td>
                                            <td>{item.tanggal_posting}</td>
                                            <td>
                                                <span
                                                    className={`badge ${item.status == 0
                                                        ? 'badge-success'
                                                        : 'badge-error'
                                                    }`}
                                                >
                                                    {item.status == 0 ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </td>
                                            <td
                                                title={item.keterangan}
                                                className="max-w-[420px] truncate"
                                            >
                                                {truncate(item.keterangan, 140)}
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
                                        <td
                                            colSpan="7"
                                            className="py-8 text-center text-gray-500"
                                        >
                                            Belum ada data berita.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen &&
                renderModal('Tambah Berita')}

            {isEditModalOpen &&
                renderModal('Edit Berita')}
        </AdminLayout>
    );
}
