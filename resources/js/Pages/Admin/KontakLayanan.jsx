import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function KontakLayanan({ kontak }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        nama_layanan: '',
        icon_class: '',
        nomor: '',
        icon_image: null,
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
            nama_layanan: item.nama_layanan,
            icon_class: item.icon_class || '',
            nomor: item.nomor || '',
            icon_image: null,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/kontak-layanan/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        } else {
            post('/admin/kontak-layanan', {
                onSuccess: () => {
                    reset()
                    closeModals()
                },
            })
        }
    }

    const hapus = (item) => {
        Swal.fire({
            title: 'Hapus kontak layanan?',
            text: `Kontak "${item.nama_layanan}" akan dihapus permanen.`,
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
                destroy(`/admin/kontak-layanan/${item.id}`, {
                    onSuccess: () => {
                        reset()
                    },
                })
            }
        })
    }

    const renderModal = (title) => (
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
                            <span className="label-text mb-2 font-medium">Nama Layanan</span>
                            <input type="text" name="nama_layanan" value={data.nama_layanan} onChange={(e) => setData('nama_layanan', e.target.value)} className="input input-bordered w-full" required />
                            {errors.nama_layanan && <span className="mt-1 text-sm text-error">{errors.nama_layanan}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Icon (class)</span>
                            <input type="text" name="icon_class" value={data.icon_class} onChange={(e) => setData('icon_class', e.target.value)} className="input input-bordered w-full" placeholder="e.g. fab fa-whatsapp" />
                            {errors.icon_class && <span className="mt-1 text-sm text-error">{errors.icon_class}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Nomor</span>
                            <input type="text" name="nomor" value={data.nomor} onChange={(e) => setData('nomor', e.target.value)} className="input input-bordered w-full" />
                            {errors.nomor && <span className="mt-1 text-sm text-error">{errors.nomor}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Icon Image (opsional)</span>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setData('icon_image', e.target.files[0])} />
                            {errors.icon_image && <span className="mt-1 text-sm text-error">{errors.icon_image}</span>}
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                        <button type="submit" disabled={processing} className="btn btn-primary">{processing ? 'Menyimpan...' : itemEdit ? 'Simpan Perubahan' : 'Tambah Kontak'}</button>
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
                        <h2 className="text-2xl font-bold text-gray-900">Kontak Layanan</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola kontak layanan (nama, icon, nomor).</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">Tambah Kontak</button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Icon</th>
                                    <th>Nama Layanan</th>
                                    <th>Nomor</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kontak.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {item.icon_image ? (
                                                    <div className="h-8 w-8 overflow-hidden rounded bg-base-200"><img src={item.icon_image} alt={item.nama_layanan} className="h-full w-full object-cover" /></div>
                                                ) : (
                                                    item.icon_class ? <i className={`${item.icon_class} text-xl`}></i> : <div className="h-8 w-8 rounded bg-base-200"></div>
                                                )}
                                            </div>
                                        </td>
                                        <td>{item.nama_layanan}</td>
                                        <td>{item.nomor}</td>
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

                {createModal && renderModal('Tambah Kontak Layanan')}
                {editModal && renderModal('Edit Kontak Layanan')}
            </div>
        </AdminLayout>
    )
}
