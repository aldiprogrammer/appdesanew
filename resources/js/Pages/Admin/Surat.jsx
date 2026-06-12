import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const statusBadge = {
    pending: 'badge-warning',
    diproses: 'badge-info',
    selesai: 'badge-success',
    ditolak: 'badge-error',
};

const statusLabel = {
    pending: 'Menunggu',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

export default function SuratIndex({ surats, jenisList, statusFilter }) {
    const { flash = {} } = usePage().props;
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [statusForm, setStatusForm] = useState({ status: '', keterangan: '' });

    const openModal = (s) => {
        setSelectedSurat(s);
        setStatusForm({ status: s.status, keterangan: s.keterangan || '' });
    };

    const closeModal = () => {
        setSelectedSurat(null);
        setStatusForm({ status: '', keterangan: '' });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.post(`/admin/surat/${selectedSurat.id}`, statusForm, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus surat?',
            text: `Data surat akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            buttonsStyling: false,
            customClass: { actions: 'flex gap-3', confirmButton: 'btn btn-error text-white', cancelButton: 'btn btn-neutral text-white' },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/surat/${item.id}`, { preserveScroll: true });
            }
        });
    };

    useEffect(() => {
        if (flash.success) {
            Swal.fire({ title: 'Berhasil', text: flash.success, icon: 'success', timer: 1800, showConfirmButton: false });
        }
        if (flash.error) {
            Swal.fire({ title: 'Gagal', text: flash.error, icon: 'error', buttonsStyling: false, customClass: { confirmButton: 'btn btn-error text-white' } });
        }
    }, [flash]);

    const dataDetail = selectedSurat?.data || {};

    return (
        <AdminLayout>
            <Head title="Manajemen Surat" />
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manajemen Surat</h2>
                    <p className="mt-1 text-sm text-gray-500">Kelola pengajuan surat dari warga.</p>
                </div>

                {/* Filter status */}
                <div className="flex flex-wrap gap-2">
                    <Link href="/admin/surat" className={`btn btn-sm ${!statusFilter ? 'btn-success' : 'btn-ghost'}`}>Semua</Link>
                    {['pending', 'diproses', 'selesai', 'ditolak'].map((s) => (
                        <Link key={s} href={`/admin/surat?status=${s}`} className={`btn btn-sm ${statusFilter === s ? 'btn-success' : 'btn-ghost'}`}>
                            {statusLabel[s]}
                        </Link>
                    ))}
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full text-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Pemohon</th>
                                    <th>NIK</th>
                                    <th>Jenis Surat</th>
                                    <th>Tanggal</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surats.data.length > 0 ? surats.data.map((s, i) => (
                                    <tr key={s.id}>
                                        <td>{surats.from + i}</td>
                                        <td className="font-medium">{s.user?.name || '-'}</td>
                                        <td className="font-mono text-xs">{s.user?.nik || '-'}</td>
                                        <td>{jenisList[s.jenis] || s.jenis}</td>
                                        <td className="text-xs">{new Date(s.created_at).toLocaleDateString('id-ID')}</td>
                                        <td><span className={`badge badge-sm ${statusBadge[s.status] || 'badge-ghost'}`}>{statusLabel[s.status] || s.status}</span></td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button onClick={() => openModal(s)} className="btn btn-warning btn-xs">Proses</button>
                                                <a href={`/admin/surat/download/${s.id}`} className="btn btn-ghost btn-xs text-emerald-600" title="Download PDF"><i className="fas fa-download"></i></a>
                                                <button onClick={() => handleDelete(s)} className="btn btn-error btn-xs text-white">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="7" className="py-8 text-center text-gray-500">Belum ada pengajuan surat.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between border-t border-base-300 px-4 py-3">
                        <span className="text-sm text-gray-500">Menampilkan {surats.from}–{surats.to} dari {surats.total}</span>
                        <div className="join">
                            {surats.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                    className={`join-item btn btn-sm ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveState preserveScroll />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Proses */}
            {selectedSurat && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                    <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-lg bg-base-100 shadow-xl">
                        <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                            <h3 className="text-lg font-semibold text-gray-900">Proses Surat</h3>
                            <button onClick={closeModal} className="btn btn-ghost btn-sm">X</button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="rounded-lg bg-gray-50 p-4 text-sm space-y-1">
                                <p><span className="text-gray-500">Pemohon:</span> <span className="font-medium">{selectedSurat.user?.name}</span></p>
                                <p><span className="text-gray-500">NIK:</span> <span className="font-medium">{selectedSurat.user?.nik}</span></p>
                                <p><span className="text-gray-500">Jenis:</span> <span className="font-medium">{jenisList[selectedSurat.jenis]}</span></p>
                                <p><span className="text-gray-500">Data:</span></p>
                                <pre className="text-xs bg-white rounded p-2 border overflow-x-auto">{JSON.stringify(dataDetail, null, 2)}</pre>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-4">
                                <label className="form-control w-full">
                                    <span className="label-text mb-1 font-medium">Status</span>
                                    <select value={statusForm.status} onChange={(e) => setStatusForm((p) => ({ ...p, status: e.target.value }))} className="select select-bordered w-full">
                                        <option value="pending">Menunggu</option>
                                        <option value="diproses">Diproses</option>
                                        <option value="selesai">Selesai</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                </label>

                                <label className="form-control w-full">
                                    <span className="label-text mb-1 font-medium">Catatan</span>
                                    <textarea value={statusForm.keterangan} onChange={(e) => setStatusForm((p) => ({ ...p, keterangan: e.target.value }))} className="textarea textarea-bordered w-full" rows="3" placeholder="Catatan untuk pemohon..."></textarea>
                                </label>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={closeModal} className="btn btn-ghost">Batal</button>
                                    <button type="submit" className="btn btn-primary">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
