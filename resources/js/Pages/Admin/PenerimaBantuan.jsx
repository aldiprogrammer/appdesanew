import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState, useMemo } from 'react'
import Swal from 'sweetalert2'

export default function PenerimaBantuan({ penerima, dusun, kategori }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        nik: '',
        nama: '',
        dusun_id: '',
        kategori_bantuan_id: '',
        keterangan: '',
    })

    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [itemEdit, setItemEdit] = useState(null)
    const [filterKategori, setFilterKategori] = useState('')

    const filtered = useMemo(() => {
        if (!filterKategori) return penerima
        return penerima.filter((item) => item.kategori_bantuan_id == filterKategori)
    }, [penerima, filterKategori])

    const closeModals = () => {
        setCreateModal(false)
        setEditModal(false)
        setItemEdit(null)
        reset()
    }

    const openCreateModal = () => {
        reset()
        setItemEdit(null)
        setCreateModal(true)
    }

    const openEditModal = (item) => {
        setItemEdit(item)
        setEditModal(true)
        setData({
            nik: item.nik,
            nama: item.nama,
            dusun_id: item.dusun_id,
            kategori_bantuan_id: item.kategori_bantuan_id,
            keterangan: item.keterangan || '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/penerima-bantuan/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        } else {
            post('/admin/penerima-bantuan', {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        }
    }

    const hapus = (item) => {
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
                destroy('/admin/penerima-bantuan/' + item.id, {
                    onSuccess: () => reset(),
                })
            }
        })
    }

    const renderModal = (title) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-base-100 shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">X</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">NIK</span>
                            <input
                                type="text"
                                name="nik"
                                value={data.nik}
                                onChange={(e) => setData('nik', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="NIK penerima"
                                required
                            />
                            {errors.nik && <span className="mt-1 text-sm text-error">{errors.nik}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Nama</span>
                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama lengkap"
                                required
                            />
                            {errors.nama && <span className="mt-1 text-sm text-error">{errors.nama}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Dusun</span>
                            <select
                                name="dusun_id"
                                value={data.dusun_id}
                                onChange={(e) => setData('dusun_id', e.target.value)}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Pilih Dusun</option>
                                {dusun.map((d) => (
                                    <option key={d.id} value={d.id}>{d.nama_dusun}</option>
                                ))}
                            </select>
                            {errors.dusun_id && <span className="mt-1 text-sm text-error">{errors.dusun_id}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kategori Bantuan</span>
                            <select
                                name="kategori_bantuan_id"
                                value={data.kategori_bantuan_id}
                                onChange={(e) => setData('kategori_bantuan_id', e.target.value)}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {kategori.map((k) => (
                                    <option key={k.id} value={k.id}>{k.nama_bantuan}</option>
                                ))}
                            </select>
                            {errors.kategori_bantuan_id && <span className="mt-1 text-sm text-error">{errors.kategori_bantuan_id}</span>}
                        </label>

                        <label className="form-control w-full md:col-span-2">
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
                    </div>

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Menyimpan...' : itemEdit ? 'Simpan Perubahan' : 'Tambah Data'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <AdminLayout>
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
                        className="select select-bordered select-sm w-full max-w-xs"
                    >
                        <option value="">Semua Kategori</option>
                        {kategori.map((k) => (
                            <option key={k.id} value={k.id}>{k.nama_bantuan}</option>
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
                                {filtered.map((item, index) => (
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
                                        <td className="space-x-2">
                                            <button className="btn btn-warning btn-sm" onClick={() => openEditModal(item)}>Edit</button>
                                            <button className="btn btn-error btn-sm" onClick={() => hapus(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="py-10 text-center text-gray-500">
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

            {createModal && renderModal('Tambah Penerima Bantuan')}
            {editModal && renderModal('Edit Penerima Bantuan')}
        </AdminLayout>
    )
}
