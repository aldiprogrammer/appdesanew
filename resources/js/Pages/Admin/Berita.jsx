import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Berita({ berita }) {
    const truncate = (text, length = 140) => {
        if (!text) return ''
        const plain = String(text).replace(/<[^>]*>/g, '')
        return plain.length > length ? `${plain.slice(0, length)}...` : plain
    }
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        judul: '',
        keterangan: '',
        tanggal_posting: '',
        status: '0',
        foto: null,
    });

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
            judul: item.judul,
            keterangan: item.keterangan,
            tanggal_posting: item.tanggal_posting,
            status: String(item.status),
            foto: null,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/berita/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        } else {
            post('/admin/berita', {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        }
    }

    const hapus = (item) => {
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
                destroy(`/admin/berita/${item.id}`, {
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
                        <button type="button" onClick={closeModals} className="btn btn-ghost btn-sm">
                            X
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Judul</span>
                                <input
                                    type="text"
                                    name="judul"
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Judul berita"
                                    required
                                />
                                {errors.judul && <span className="mt-1 text-sm text-error">{errors.judul}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Tanggal Posting</span>
                                <input
                                    type="date"
                                    name="tanggal_posting"
                                    value={data.tanggal_posting}
                                    onChange={(e) => setData('tanggal_posting', e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                                {errors.tanggal_posting && <span className="mt-1 text-sm text-error">{errors.tanggal_posting}</span>}
                            </label>

                            <label className="form-control w-full md:col-span-2">
                                <span className="label-text mb-2 font-medium">Keterangan</span>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    name="keterangan"
                                    value={data.keterangan}
                                    placeholder="Deskripsi berita"
                                    required
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                />
                                {errors.keterangan && <span className="mt-1 text-sm text-error">{errors.keterangan}</span>}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Status</span>
                                <select
                                    className="select select-bordered w-full"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required>
                                    <option value="0">Aktif</option>
                                    <option value="1">Tidak Aktif</option>
                                </select>
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Foto Berita</span>
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
                            <button type="button" onClick={closeModals} className="btn btn-ghost">
                                Batal
                            </button>
                            <button type="submit" disabled={processing} className="btn btn-primary">
                                {processing ? 'Menyimpan...' : itemEdit ? 'Simpan Perubahan' : 'Tambah Berita'}
                            </button>
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
                                {berita.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="h-16 w-24 overflow-hidden rounded-lg bg-base-200">
                                                    {item.foto ? (
                                                        <img src={item.foto} alt={item.judul} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-xs text-gray-500">No image</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.judul}</td>
                                        <td>{item.tanggal_posting}</td>
                                        <td>
                                            <span className={`badge ${item.status === 0 ? 'badge-success' : 'badge-error'}`}>
                                                {item.status === 0 ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td title={item.keterangan} className="max-w-[420px] truncate">
                                            {truncate(item.keterangan, 140)}
                                        </td>
                                        <td className="space-y-2">
                                            <button className="btn btn-warning btn-sm w-full" onClick={() => openEditModal(item)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-error btn-sm w-full" onClick={() => hapus(item)}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {createModal && renderModal('Tambah Berita')}
            {editModal && renderModal('Edit Berita')}
        </AdminLayout>
    )
}
