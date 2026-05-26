import AdminLayout from '@/Layouts/AdminLayout'
import { useForm, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function ApbdesIndex({ apbdes }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        tahun: '',
        keterangan: '',
    })

    const [createModal, setCreateModal] = useState(false)

    const closeModals = () => {
        setCreateModal(false)
        reset()
    }

    const openCreateModal = () => {
        reset()
        setCreateModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/admin/apbdes', {
            onSuccess: () => {
                reset()
                closeModals()
            },
        })
    }

    const statusBadge = (status) => {
        const map = {
            draft: 'badge-ghost',
            disetujui: 'badge-success',
            ditolak: 'badge-error',
            realisasi: 'badge-info',
        }
        return <span className={`badge ${map[status] || 'badge-ghost'} capitalize`}>{status}</span>
    }

    const rupiah = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">APBDes</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Anggaran Pendapatan dan Belanja Desa — kelola anggaran tahunan desa.
                        </p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Buat APBDes Baru
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Tahun</th>
                                    <th>Total Pendapatan</th>
                                    <th>Total Belanja</th>
                                    <th>Sisa Anggaran</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apbdes.map((item) => {
                                    const sisa = Number(item.total_pendapatan) - Number(item.total_belanja)
                                    return (
                                        <tr key={item.id}>
                                            <td className="font-bold text-lg">{item.tahun}</td>
                                            <td className="font-medium">{rupiah(item.total_pendapatan)}</td>
                                            <td className="font-medium">{rupiah(item.total_belanja)}</td>
                                            <td className={`font-semibold ${sisa >= 0 ? 'text-success' : 'text-error'}`}>
                                                {rupiah(sisa)}
                                            </td>
                                            <td>{statusBadge(item.status)}</td>
                                            <td>
                                                <Link
                                                    href={`/admin/apbdes/${item.id}`}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {apbdes.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-500">
                                            Belum ada data APBDes. Klik "Buat APBDes Baru" untuk memulai.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {createModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                    <div className="w-full max-w-xl rounded-lg bg-base-100 shadow-xl">
                        <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                            <h3 className="text-lg font-semibold text-gray-900">Buat APBDes Baru</h3>
                            <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">X</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Tahun Anggaran</span>
                                <input
                                    type="number"
                                    name="tahun"
                                    value={data.tahun}
                                    onChange={(e) => setData('tahun', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="2025"
                                    min="2020"
                                    max="2099"
                                    required
                                />
                                {errors.tahun && <span className="mt-1 text-sm text-error">{errors.tahun}</span>}
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Keterangan</span>
                                <textarea
                                    name="keterangan"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Keterangan (opsional)"
                                    rows="3"
                                />
                            </label>
                            <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                                <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                                <button type="submit" disabled={processing} className="btn btn-primary">
                                    {processing ? 'Menyimpan...' : 'Buat APBDes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
