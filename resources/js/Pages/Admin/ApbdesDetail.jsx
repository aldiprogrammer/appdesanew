import AdminLayout from '@/Layouts/AdminLayout'
import { useForm, Link, router } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function ApbdesDetail({ apbdes }) {
    const rupiah = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')
    const sisa = Number(apbdes.total_pendapatan) - Number(apbdes.total_belanja)

    const statusOptions = ['draft', 'disetujui', 'ditolak', 'realisasi']
    const statusBadge = (s) => {
        const map = { draft: 'badge-ghost', disetujui: 'badge-success', ditolak: 'badge-error', realisasi: 'badge-info' }
        return <span className={`badge ${map[s] || 'badge-ghost'} capitalize`}>{s}</span>
    }

    // ── Update main APBDes ──────────────────────────────────

    const [editMain, setEditMain] = useState(false)
    const mainForm = useForm({
        tahun: apbdes.tahun,
        keterangan: apbdes.keterangan || '',
        status: apbdes.status,
    })

    const openEditMain = () => {
        mainForm.setData({ tahun: apbdes.tahun, keterangan: apbdes.keterangan || '', status: apbdes.status })
        setEditMain(true)
    }

    const handleMainUpdate = (e) => {
        e.preventDefault()
        mainForm.put('/admin/apbdes/' + apbdes.id, {
            onSuccess: () => setEditMain(false),
        })
    }

    const hapusApbdes = () => {
        Swal.fire({
            title: 'Hapus APBDes?',
            text: `APBDes tahun ${apbdes.tahun} dan seluruh itemnya akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            buttonsStyling: false,
            customClass: { actions: 'flex gap-3', confirmButton: 'btn btn-error text-white', cancelButton: 'btn btn-neutral text-white' },
        }).then((r) => {
            if (r.isConfirmed) {
                router.delete('/admin/apbdes/' + apbdes.id)
            }
        })
    }

    // ── Pendapatan CRUD ─────────────────────────────────────

    const [pendModal, setPendModal] = useState(null) // null | 'create' | edit item
    const pendForm = useForm({ sumber_pendapatan: '', jumlah: '', keterangan: '' })

    const openCreatePend = () => {
        pendForm.reset()
        setPendModal('create')
    }
    const openEditPend = (item) => {
        pendForm.setData({ sumber_pendapatan: item.sumber_pendapatan, jumlah: String(item.jumlah), keterangan: item.keterangan || '' })
        setPendModal(item)
    }
    const closePend = () => { setPendModal(null); pendForm.reset() }

    const submitPend = (e) => {
        e.preventDefault()
        if (pendModal === 'create') {
            pendForm.post('/admin/apbdes/' + apbdes.id + '/pendapatan', { onSuccess: closePend })
        } else {
            pendForm.put('/admin/apbdes/' + apbdes.id + '/pendapatan/' + pendModal.id, { onSuccess: closePend })
        }
    }

    const hapusPend = (item) => {
        Swal.fire({
            title: 'Hapus pendapatan?',
            text: `"${item.sumber_pendapatan}" akan dihapus.`,
            icon: 'warning', showCancelButton: true, confirmButtonText: 'Ya', cancelButtonText: 'Batal',
            reverseButtons: true, buttonsStyling: false,
            customClass: { actions: 'flex gap-3', confirmButton: 'btn btn-error text-white', cancelButton: 'btn btn-neutral text-white' },
        }).then((r) => { if (r.isConfirmed) router.delete('/admin/apbdes/' + apbdes.id + '/pendapatan/' + item.id) })
    }

    // ── Belanja CRUD ────────────────────────────────────────

    const [belModal, setBelModal] = useState(null)
    const belForm = useForm({ kegiatan: '', kategori: '', jumlah: '', lokasi: '', keterangan: '' })

    const openCreateBel = () => { belForm.reset(); setBelModal('create') }
    const openEditBel = (item) => {
        belForm.setData({ kegiatan: item.kegiatan, kategori: item.kategori, jumlah: String(item.jumlah), lokasi: item.lokasi || '', keterangan: item.keterangan || '' })
        setBelModal(item)
    }
    const closeBel = () => { setBelModal(null); belForm.reset() }

    const submitBel = (e) => {
        e.preventDefault()
        if (belModal === 'create') {
            belForm.post('/admin/apbdes/' + apbdes.id + '/belanja', { onSuccess: closeBel })
        } else {
            belForm.put('/admin/apbdes/' + apbdes.id + '/belanja/' + belModal.id, { onSuccess: closeBel })
        }
    }

    const hapusBel = (item) => {
        Swal.fire({
            title: 'Hapus belanja?',
            text: `"${item.kegiatan}" akan dihapus.`,
            icon: 'warning', showCancelButton: true, confirmButtonText: 'Ya', cancelButtonText: 'Batal',
            reverseButtons: true, buttonsStyling: false,
            customClass: { actions: 'flex gap-3', confirmButton: 'btn btn-error text-white', cancelButton: 'btn btn-neutral text-white' },
        }).then((r) => { if (r.isConfirmed) router.delete('/admin/apbdes/' + apbdes.id + '/belanja/' + item.id) })
    }

    // ── Modal renderers ─────────────────────────────────────

    const pendModalRender = () => {
        if (!pendModal) return null
        const isEdit = pendModal !== 'create'
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                <div className="w-full max-w-xl rounded-lg bg-base-100 shadow-xl">
                    <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                        <h3 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Pendapatan' : 'Tambah Pendapatan'}</h3>
                        <button type="button" onClick={closePend} className="btn btn-ghost btn-sm">X</button>
                    </div>
                    <form onSubmit={submitPend} className="space-y-4 p-5">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Sumber Pendapatan</span>
                            <input type="text" name="sumber_pendapatan" value={pendForm.data.sumber_pendapatan}
                                onChange={(e) => pendForm.setData('sumber_pendapatan', e.target.value)}
                                className="input input-bordered w-full" placeholder="Dana Desa, ADD, Pajak, ..." required />
                            {pendForm.errors.sumber_pendapatan && <span className="mt-1 text-sm text-error">{pendForm.errors.sumber_pendapatan}</span>}
                        </label>
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Jumlah (Rp)</span>
                            <input type="number" name="jumlah" value={pendForm.data.jumlah}
                                onChange={(e) => pendForm.setData('jumlah', e.target.value)}
                                className="input input-bordered w-full" placeholder="0" min="0" required />
                            {pendForm.errors.jumlah && <span className="mt-1 text-sm text-error">{pendForm.errors.jumlah}</span>}
                        </label>
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Keterangan</span>
                            <textarea name="keterangan" value={pendForm.data.keterangan}
                                onChange={(e) => pendForm.setData('keterangan', e.target.value)}
                                className="textarea textarea-bordered w-full" placeholder="Opsional" rows="2" />
                        </label>
                        <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                            <button type="button" onClick={closePend} className="btn btn-ghost">Batal</button>
                            <button type="submit" disabled={pendForm.processing} className="btn btn-primary">
                                {pendForm.processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const belModalRender = () => {
        if (!belModal) return null
        const isEdit = belModal !== 'create'
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                <div className="w-full max-w-xl rounded-lg bg-base-100 shadow-xl">
                    <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                        <h3 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Belanja' : 'Tambah Belanja'}</h3>
                        <button type="button" onClick={closeBel} className="btn btn-ghost btn-sm">X</button>
                    </div>
                    <form onSubmit={submitBel} className="space-y-4 p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Kegiatan</span>
                                <input type="text" name="kegiatan" value={belForm.data.kegiatan}
                                    onChange={(e) => belForm.setData('kegiatan', e.target.value)}
                                    className="input input-bordered w-full" placeholder="Nama kegiatan" required />
                                {belForm.errors.kegiatan && <span className="mt-1 text-sm text-error">{belForm.errors.kegiatan}</span>}
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Kategori</span>
                                <select name="kategori" value={belForm.data.kategori}
                                    onChange={(e) => belForm.setData('kategori', e.target.value)}
                                    className="select select-bordered w-full" required>
                                    <option value="">Pilih kategori</option>
                                    <option value="Pembangunan">Pembangunan</option>
                                    <option value="Operasional">Operasional</option>
                                    <option value="Pemberdayaan">Pemberdayaan</option>
                                    <option value="Sosial">Sosial</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                                {belForm.errors.kategori && <span className="mt-1 text-sm text-error">{belForm.errors.kategori}</span>}
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Jumlah (Rp)</span>
                                <input type="number" name="jumlah" value={belForm.data.jumlah}
                                    onChange={(e) => belForm.setData('jumlah', e.target.value)}
                                    className="input input-bordered w-full" placeholder="0" min="0" required />
                                {belForm.errors.jumlah && <span className="mt-1 text-sm text-error">{belForm.errors.jumlah}</span>}
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Lokasi</span>
                                <input type="text" name="lokasi" value={belForm.data.lokasi}
                                    onChange={(e) => belForm.setData('lokasi', e.target.value)}
                                    className="input input-bordered w-full" placeholder="Lokasi (opsional)" />
                            </label>
                        </div>
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Keterangan</span>
                            <textarea name="keterangan" value={belForm.data.keterangan}
                                onChange={(e) => belForm.setData('keterangan', e.target.value)}
                                className="textarea textarea-bordered w-full" placeholder="Opsional" rows="2" />
                        </label>
                        <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                            <button type="button" onClick={closeBel} className="btn btn-ghost">Batal</button>
                            <button type="submit" disabled={belForm.processing} className="btn btn-primary">
                                {belForm.processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    // ── Main layout ─────────────────────────────────────────

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/apbdes" className="btn btn-ghost btn-sm">
                            &larr; Kembali
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">APBDes Tahun {apbdes.tahun}</h2>
                            <p className="mt-1 text-sm text-gray-500">{apbdes.keterangan || '—'}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={openEditMain} className="btn btn-warning btn-sm">Edit APBDes</button>
                        <button onClick={hapusApbdes} className="btn btn-error btn-sm">Hapus</button>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-base-300 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Pendapatan</p>
                        <p className="mt-2 text-2xl font-bold text-success">{rupiah(apbdes.total_pendapatan)}</p>
                    </div>
                    <div className="rounded-xl border border-base-300 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Belanja</p>
                        <p className="mt-2 text-2xl font-bold text-error">{rupiah(apbdes.total_belanja)}</p>
                    </div>
                    <div className="rounded-xl border border-base-300 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Sisa Anggaran</p>
                        <p className={`mt-2 text-2xl font-bold ${sisa >= 0 ? 'text-success' : 'text-error'}`}>
                            {rupiah(sisa)}
                        </p>
                    </div>
                    <div className="rounded-xl border border-base-300 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <div className="mt-2">{statusBadge(apbdes.status)}</div>
                    </div>
                </div>

                {/* Pendapatan */}
                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                        <h3 className="text-lg font-semibold text-gray-900">Pendapatan</h3>
                        <button onClick={openCreatePend} className="btn btn-primary btn-sm">Tambah Pendapatan</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr><th>No</th><th>Sumber Pendapatan</th><th>Jumlah</th><th>Keterangan</th><th>Aksi</th></tr>
                            </thead>
                            <tbody>
                                {apbdes.pendapatans.map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{i + 1}</td>
                                        <td className="font-medium">{item.sumber_pendapatan}</td>
                                        <td className="font-semibold">{rupiah(item.jumlah)}</td>
                                        <td className="max-w-[200px] truncate text-sm text-gray-500">{item.keterangan || '-'}</td>
                                        <td className="space-x-2">
                                            <button className="btn btn-warning btn-sm" onClick={() => openEditPend(item)}>Edit</button>
                                            <button className="btn btn-error btn-sm" onClick={() => hapusPend(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {apbdes.pendapatans.length === 0 && (
                                    <tr><td colSpan="5" className="py-8 text-center text-gray-500">Belum ada pendapatan.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Belanja */}
                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                        <h3 className="text-lg font-semibold text-gray-900">Belanja</h3>
                        <button onClick={openCreateBel} className="btn btn-primary btn-sm">Tambah Belanja</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr><th>No</th><th>Kegiatan</th><th>Kategori</th><th>Jumlah</th><th>Lokasi</th><th>Aksi</th></tr>
                            </thead>
                            <tbody>
                                {apbdes.belanjas.map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{i + 1}</td>
                                        <td className="font-medium">{item.kegiatan}</td>
                                        <td><span className="badge badge-outline">{item.kategori}</span></td>
                                        <td className="font-semibold">{rupiah(item.jumlah)}</td>
                                        <td className="text-sm text-gray-500">{item.lokasi || '-'}</td>
                                        <td className="space-x-2">
                                            <button className="btn btn-warning btn-sm" onClick={() => openEditBel(item)}>Edit</button>
                                            <button className="btn btn-error btn-sm" onClick={() => hapusBel(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {apbdes.belanjas.length === 0 && (
                                    <tr><td colSpan="6" className="py-8 text-center text-gray-500">Belum ada belanja.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {editMain && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                    <div className="w-full max-w-xl rounded-lg bg-base-100 shadow-xl">
                        <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                            <h3 className="text-lg font-semibold text-gray-900">Edit APBDes</h3>
                            <button type="button" onClick={() => setEditMain(false)} className="btn btn-ghost btn-sm">X</button>
                        </div>
                        <form onSubmit={handleMainUpdate} className="space-y-4 p-5">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="form-control w-full">
                                    <span className="label-text mb-2 font-medium">Tahun</span>
                                    <input type="number" name="tahun" value={mainForm.data.tahun}
                                        onChange={(e) => mainForm.setData('tahun', e.target.value)}
                                        className="input input-bordered w-full" required />
                                    {mainForm.errors.tahun && <span className="mt-1 text-sm text-error">{mainForm.errors.tahun}</span>}
                                </label>
                                <label className="form-control w-full">
                                    <span className="label-text mb-2 font-medium">Status</span>
                                    <select name="status" value={mainForm.data.status}
                                        onChange={(e) => mainForm.setData('status', e.target.value)}
                                        className="select select-bordered w-full" required>
                                        {statusOptions.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                                    </select>
                                </label>
                            </div>
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Keterangan</span>
                                <textarea name="keterangan" value={mainForm.data.keterangan}
                                    onChange={(e) => mainForm.setData('keterangan', e.target.value)}
                                    className="textarea textarea-bordered w-full" rows="3" />
                            </label>
                            <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                                <button type="button" onClick={() => setEditMain(false)} className="btn btn-ghost">Batal</button>
                                <button type="submit" disabled={mainForm.processing} className="btn btn-primary">
                                    {mainForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {pendModalRender()}
            {belModalRender()}
        </AdminLayout>
    )
}
