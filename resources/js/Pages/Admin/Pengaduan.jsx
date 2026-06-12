import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    id_user: '',
    nik: '',
    jenis_pengaduan: '',
    keterangan: '',
    foto: '',
    status: 'pending',
};

export default function Pengaduan({ pengaduan, users }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailItem, setDetailItem] = useState(null);
    const [processing, setProcessing] = useState(false);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingItem(null);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setIsDetailModalOpen(false);
        setDetailItem(null);
        resetForm();
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setForm({
            id_user: String(item.id_user || ''),
            nik: item.nik || '',
            jenis_pengaduan: item.jenis_pengaduan || '',
            keterangan: item.keterangan || '',
            foto: item.foto || '',
            status: item.status || 'pending',
        });
        setIsEditModalOpen(true);
    };

    const openDetailModal = (item) => {
        setDetailItem(item);
        setIsDetailModalOpen(true);
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
            router.post(`/admin/pengaduan/${editingItem.id}`, form, options);
            return;
        }

        router.post('/admin/pengaduan', form, options);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus Pengaduan?',
            text: `Pengaduan "${item.jenis_pengaduan}" akan dihapus permanen.`,
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
                router.delete(`/admin/pengaduan/${item.id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const statusBadge = (status) => {
        const map = {
            pending: 'badge-warning',
            diproses: 'badge-info',
            selesai: 'badge-success',
            ditolak: 'badge-error',
        };
        const labels = {
            pending: 'Pending',
            diproses: 'Diproses',
            selesai: 'Selesai',
            ditolak: 'Ditolak',
        };
        return <span className={`badge ${map[status] || 'badge-ghost'}`}>{labels[status] || status}</span>;
    };

    const renderModal = (title) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-xl rounded-lg bg-base-100 shadow-xl">
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
                            <span className="label-text mb-2 font-medium">User</span>
                            <select
                                name="id_user"
                                value={form.id_user}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih user</option>
                                {users.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name} ({item.email})
                                    </option>
                                ))}
                            </select>
                            {errors.id_user && (
                                <span className="mt-1 text-sm text-error">{errors.id_user}</span>
                            )}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">NIK <span className="text-gray-400">(opsional)</span></span>
                            <input
                                type="text"
                                name="nik"
                                value={form.nik}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="16 digit NIK"
                                maxLength={16}
                            />
                            {errors.nik && (
                                <span className="mt-1 text-sm text-error">{errors.nik}</span>
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
                                <option value="pending">Pending</option>
                                <option value="diproses">Diproses</option>
                                <option value="selesai">Selesai</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                            {errors.status && (
                                <span className="mt-1 text-sm text-error">{errors.status}</span>
                            )}
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Jenis Pengaduan</span>
                        <input
                            type="text"
                            name="jenis_pengaduan"
                            value={form.jenis_pengaduan}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Contoh: Infrastruktur, Layanan, Lingkungan, dll"
                        />
                        {errors.jenis_pengaduan && (
                            <span className="mt-1 text-sm text-error">{errors.jenis_pengaduan}</span>
                        )}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Keterangan</span>
                        <textarea
                            name="keterangan"
                            value={form.keterangan}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full"
                            placeholder="Deskripsi pengaduan"
                            rows={4}
                        />
                        {errors.keterangan && (
                            <span className="mt-1 text-sm text-error">{errors.keterangan}</span>
                        )}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Foto <span className="text-gray-400">(opsional)</span></span>
                        <input
                            type="text"
                            name="foto"
                            value={form.foto}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Path URL foto"
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
                                    : 'Tambah Pengaduan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderDetail = () => {
        if (!detailItem) return null;

        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                <div className="w-full max-w-lg rounded-lg bg-base-100 shadow-xl">
                    <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                        <h3 className="text-lg font-semibold text-gray-900">Detail Pengaduan</h3>
                        <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">
                            X
                        </button>
                    </div>

                    <div className="space-y-4 p-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500">User</p>
                                <p className="font-medium text-gray-900">{detailItem.user?.name || '-'}</p>
                                <p className="text-sm text-gray-500">{detailItem.user?.email || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">NIK</p>
                                <p className="font-mono text-sm text-gray-900">{detailItem.nik || detailItem.penduduk?.nik || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">Status</p>
                                <div className="mt-1">{statusBadge(detailItem.status)}</div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">Jenis Pengaduan</p>
                            <p className="font-medium text-gray-900">{detailItem.jenis_pengaduan}</p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-500">Keterangan</p>
                            <p className="whitespace-pre-wrap text-sm text-gray-700">{detailItem.keterangan}</p>
                        </div>

                        {detailItem.foto && (
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">Foto</p>
                                <img
                                    src={detailItem.foto}
                                    alt="Foto pengaduan"
                                    className="w-full rounded-lg border border-base-300"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                            <div>
                                <p>Dibuat: {new Date(detailItem.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <p>Diupdate: {new Date(detailItem.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end border-t border-base-300 p-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        );
    };

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
            <Head title="Pengaduan" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Pengaduan</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola pengaduan masyarakat — pantau dan tindak lanjuti setiap laporan.
                        </p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Pengaduan
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>User</th>
                                    <th>NIK</th>
                                    <th>Jenis Pengaduan</th>
                                    <th>Status</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengaduan.length > 0 ? (
                                    pengaduan.map((item, i) => (
                                        <tr key={item.id}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <p className="font-medium">{item.user?.name || '-'}</p>
                                                <p className="text-xs text-gray-500">{item.user?.email || '-'}</p>
                                            </td>
                                            <td>
                                                <span className="font-mono text-sm">{item.nik || item.penduduk?.nik || '-'}</span>
                                            </td>
                                            <td>{item.jenis_pengaduan}</td>
                                            <td>{statusBadge(item.status)}</td>
                                            <td className="text-sm text-gray-500">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openDetailModal(item)}
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        Detail
                                                    </button>
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
                                            Belum ada data pengaduan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Pengaduan')}
            {isEditModalOpen && renderModal('Edit Pengaduan')}
            {isDetailModalOpen && renderDetail()}
        </AdminLayout>
    );
}
