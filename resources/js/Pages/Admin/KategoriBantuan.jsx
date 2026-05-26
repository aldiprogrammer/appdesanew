import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function KategoriBantuan({ kategori }) {
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        nama_bantuan: '',
    })

    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [itemEdit, setItemEdit] = useState(null)

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
        setData('nama_bantuan', item.nama_bantuan)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/kategori-bantuan/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        } else {
            post('/admin/kategori-bantuan', {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        }
    }

    const hapus = (item) => {
        Swal.fire({
            title: 'Hapus kategori bantuan?',
            text: `Kategori "${item.nama_bantuan}" akan dihapus permanen.`,
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
                destroy('/admin/kategori-bantuan/' + item.id, {
                    onSuccess: () => reset(),
                })
            }
        })
    }

    const renderModal = (title) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg bg-base-100 shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-base-300 p-5">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">X</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Nama Bantuan</span>
                        <input
                            type="text"
                            name="nama_bantuan"
                            value={data.nama_bantuan}
                            onChange={(e) => setData('nama_bantuan', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Nama bantuan"
                            required
                        />
                    </label>

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
                        <h2 className="text-2xl font-bold text-gray-900">Kategori Bantuan</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola jenis bantuan yang tersedia.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Kategori
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Bantuan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kategori.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="font-medium">{item.nama_bantuan}</td>
                                        <td className="space-x-2">
                                            <button className="btn btn-warning btn-sm" onClick={() => openEditModal(item)}>Edit</button>
                                            <button className="btn btn-error btn-sm" onClick={() => hapus(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {kategori.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-10 text-center text-gray-500">
                                            Belum ada kategori bantuan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {createModal && renderModal('Tambah Kategori Bantuan')}
            {editModal && renderModal('Edit Kategori Bantuan')}
        </AdminLayout>
    )
}
