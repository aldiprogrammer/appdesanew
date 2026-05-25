import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Umkm({ umkm }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        nama_usaha: '',
        alamat: '',
        keterangan: '',
        nohp: '',
        foto1: null,
        foto2: null,
        foto3: null,
    })

    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [itemEdit, setItemEdit] = useState(null)

    const closeModals = () => {
        setCreateModal(false)
        setEditModal(false)
        setItemEdit(null)
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
            nama_usaha: item.nama_usaha,
            alamat: item.alamat || '',
            keterangan: item.keterangan || '',
            nohp: item.nohp || '',
            foto1: null,
            foto2: null,
            foto3: null,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/umkm/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        } else {
            post('/admin/umkm', {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        }
    }

    const hapus = (item) => {
        Swal.fire({
            title: 'Hapus UMKM?',
            text: `UMKM "${item.nama_usaha}" akan dihapus permanen`,
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
                destroy(`/admin/umkm/${item.id}`, {
                    onSuccess: () => {
                        reset()
                    },
                })
            }
        })
    }

    const renderModal = (title) => {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
                <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-base-100 shadow-xl">
                    <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        </div>
                        <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">X</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Nama Usaha</span>
                                <input type="text" name="nama_usaha" value={data.nama_usaha} onChange={(e) => setData('nama_usaha', e.target.value)} className="input input-bordered w-full" required />
                                {errors.nama_usaha && <span className="mt-1 text-sm text-error">{errors.nama_usaha}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">No. HP</span>
                                <input type="text" name="nohp" value={data.nohp} onChange={(e) => setData('nohp', e.target.value)} className="input input-bordered w-full" />
                                {errors.nohp && <span className="mt-1 text-sm text-error">{errors.nohp}</span>}
                            </label>

                            <label className="form-control w-full md:col-span-2">
                                <span className="label-text mb-2 font-medium">Alamat</span>
                                <input type="text" name="alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} className="input input-bordered w-full" />
                                {errors.alamat && <span className="mt-1 text-sm text-error">{errors.alamat}</span>}
                            </label>

                            <label className="form-control w-full md:col-span-2">
                                <span className="label-text mb-2 font-medium">Keterangan</span>
                                <textarea className="textarea textarea-bordered w-full" name="keterangan" value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
                                {errors.keterangan && <span className="mt-1 text-sm text-error">{errors.keterangan}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Foto 1</span>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setData('foto1', e.target.files[0])} />
                                {errors.foto1 && <span className="mt-1 text-sm text-error">{errors.foto1}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Foto 2</span>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setData('foto2', e.target.files[0])} />
                                {errors.foto2 && <span className="mt-1 text-sm text-error">{errors.foto2}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Foto 3</span>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setData('foto3', e.target.files[0])} />
                                {errors.foto3 && <span className="mt-1 text-sm text-error">{errors.foto3}</span>}
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                            <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                            <button type="submit" disabled={processing} className="btn btn-primary">{processing ? 'Menyimpan...' : itemEdit ? 'Simpan Perubahan' : 'Tambah UMKM'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">UMKM</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola data UMKM (foto usaha, nama, alamat, keterangan, nohp).</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">Tambah UMKM</button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Nama Usaha</th>
                                    <th>Alamat</th>
                                    <th>No. HP</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {umkm.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                {[item.foto1, item.foto2, item.foto3].map((f, i) => (
                                                    <div key={i} className="h-16 w-20 overflow-hidden rounded-lg bg-base-200">
                                                        {f ? (<img src={f} alt={`Foto ${i + 1} ${item.nama_usaha}`} className="h-full w-full object-cover" />) : (<div className="flex h-full items-center justify-center text-xs text-gray-500">No</div>)}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{item.nama_usaha}</td>
                                        <td>{item.alamat}</td>
                                        <td>{item.nohp}</td>
                                        <td className="max-w-xs">
                                            {item.keterangan ? (item.keterangan.length > 120 ? item.keterangan.slice(0, 120) + '...' : item.keterangan) : '-'}
                                        </td>
                                        <td className="space-y-2">
                                            <button className="btn btn-warning btn-sm w-full" onClick={() => openEditModal(item)}>Edit</button>
                                            <button className="btn btn-error btn-sm w-full" onClick={() => hapus(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {createModal && renderModal('Tambah UMKM')}
                {editModal && renderModal('Edit UMKM')}
            </div>
        </AdminLayout>
    )
}
