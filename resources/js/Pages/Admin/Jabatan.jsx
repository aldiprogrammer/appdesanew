import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function Jabatan({ jabatan }) {
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        jabatan: '',
    })


    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    // const [processing, setProcessing] = useState(false);

    const openCreateModal = () => {
        reset();
        setIsCreateModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            put('/admin/jabatan/' + editingItem.id, {
                onSuccess: () => {
                    reset();
                    closeModals(true)
                }
            })
        } else {
            post('/admin/jabatan', {
                onSuccess: () => {
                    reset();
                    closeModals(true)
                }
            })
        }

    }

    const openEditModal = (item) => {
        setEditingItem(item)
        setIsEditModalOpen(true);
        setData('jabatan', item.jabatan);
    }

    const hapus = (item) => {
        Swal.fire({
            title: 'Hapus kepala dusun?',
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
                destroy(`/admin/jabatan/${item.id}`, {
                    onSuccess: () => {
                        reset();
                    }
                });
            }
        });
    };



    const renderModal = (title, subtitle) => (
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
                    <div className="grid gap-4">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Jabatan</span>
                            <input
                                type="text"
                                name="jabatan"
                                value={data.jabatan}
                                onChange={(e) => setData('jabatan', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama kepala dusun"
                            />
                            {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                        </label>
                    </div>


                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing
                                ? 'Menyimpan...'
                                : editingItem
                                    ? 'Simpan Perubahan'
                                    : 'Tambah Data'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Data Jabatan</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola data jabatan.
                        </p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        Tambah Jabatan
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Jabatan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jabatan.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.jabatan}</td>
                                        <td>
                                            <button className='btn btn-warning btn-sm' onClick={() => openEditModal(item)}>Edit</button>
                                            {" "}
                                            <button className='btn btn-error btn-sm' onClick={() => hapus(item)}>Hapus</button>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen &&
                renderModal('Tambah Jabatan', 'Masukkan data jabatan.')}


            {isEditModalOpen && renderModal('Edit Jabatan', '')}
        </AdminLayout>
    )
}
