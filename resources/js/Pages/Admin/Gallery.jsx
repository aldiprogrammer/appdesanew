import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Gallery({ gallery }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        nama_kegiatan: '',
        tanggal: '',
        foto: null,
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
            nama_kegiatan: item.nama_kegiatan,
            tanggal: item.tanggal,
            foto: null,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/gallery/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        } else {
            post('/admin/gallery', {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        }
    }

    const hapus = (item) => {
        Swal.fire({
            title: 'Hapus foto gallery?',
            text: `Foto "${item.nama_kegiatan}" akan dihapus permanen.`,
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
                destroy(`/admin/gallery/${item.id}`, {
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
                                <span className="label-text mb-2 font-medium">Nama Kegiatan</span>
                                <input
                                    type="text"
                                    name="nama_kegiatan"
                                    value={data.nama_kegiatan}
                                    onChange={(e) => setData('nama_kegiatan', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Nama kegiatan"
                                    required
                                />
                                {errors.nama_kegiatan && <span className="mt-1 text-sm text-error">{errors.nama_kegiatan}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Tanggal</span>
                                <input
                                    type="date"
                                    name="tanggal"
                                    value={data.tanggal}
                                    onChange={(e) => setData('tanggal', e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                                {errors.tanggal && <span className="mt-1 text-sm text-error">{errors.tanggal}</span>}
                            </label>

                            <label className="form-control w-full md:col-span-2">
                                <span className="label-text mb-2 font-medium">Foto</span>
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setData('foto', e.target.files[0])}
                                />
                                {errors.foto && <span className="mt-1 text-sm text-error">{errors.foto}</span>}
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                            <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                            <button type="submit" disabled={processing} className="btn btn-primary">{processing ? 'Menyimpan...' : itemEdit ? 'Simpan Perubahan' : 'Tambah Foto'}</button>
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
                        <h2 className="text-2xl font-bold text-gray-900">Galeri</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola foto galeri kegiatan.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">Tambah Foto</button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gallery.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="h-20 w-28 overflow-hidden rounded-lg bg-base-200">
                                                    {item.foto ? (<img src={item.foto} alt={item.nama_kegiatan} className="h-full w-full object-cover" />) : (<div className="flex h-full items-center justify-center text-xs text-gray-500">No image</div>)}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.nama_kegiatan}</td>
                                        <td>{item.tanggal}</td>
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
            </div>

            {createModal && renderModal('Tambah Foto')}
            {editModal && renderModal('Edit Foto')}
        </AdminLayout>
    )
}
