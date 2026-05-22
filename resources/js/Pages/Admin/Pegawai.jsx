import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

export default function Pegawai({ pegawai, jabatan }) {
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        nama: '',
        nik: '',
        nip: '',
        jabatan: '',
        nohp: '',
        alamat: '',
        foto: null,
    });

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);

    const closeModals = () => {
        setCreateModal(false);
        setEditModal(false);
    }

    const openEditModal = (item) => {
        setItemEdit(item);
        setEditModal(true)
        setData({
            'nama': item.nama,
            'nik': item.nik,
            'nip': item.nip,
            'jabatan': item.id_jabatan,
            'nohp': item.nohp,
            'alamat': item.alamat,
            'foto': null,
        });
    }




    const openCreateModal = () => {
        reset();
        setCreateModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (itemEdit) {
            put('/admin/pegawai/' + itemEdit.id, {
                onSuccess: () => {
                    reset();
                    closeModals()
                }
            })
        } else {
            post('/admin/pegawai', {
                onSuccess: () => {
                    reset();
                    closeModals()
                }
            })
        }

    }


    const renderModal = (title, subject) => {
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
                        <div className="grid gap-4  md:grid-cols-2">
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Nama</span>
                                <input
                                    type="text"
                                    name="jabatan"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Nama kepala dusun"
                                />
                                {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">NIK</span>
                                <input
                                    type="number"
                                    name="nik"
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Nik pegwai"
                                    required
                                />
                                {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">NIP</span>
                                <input
                                    type="text"
                                    name="nik"
                                    value={data.nip}
                                    onChange={(e) => setData('nip', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Nip pegawai" required
                                />
                                {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                            </label>


                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">No Hp</span>
                                <input
                                    type="number"
                                    name="nohp"
                                    value={data.nohp}
                                    onChange={(e) => setData('nohp', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="No hp pegawai" required
                                />
                                {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Jabatan</span>
                                <select name="jabatan" className='select select-bordered' id="" required onChange={(e) => setData('jabatan', e.target.value)}>
                                    {data.jabatan != '' ? <option value={data.jabatan}>{itemEdit.jb.jabatan}</option> : <option value="">-- PIlih Jabatan --</option>}

                                    {jabatan.map((item, index) => (
                                        <option key={index} value={item.id}>{item.jabatan}</option>
                                    ))}
                                </select>
                                {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Alamat</span>
                                <textarea name="alamat" value={data.alamat} className='textarea textarea-bordered w-full' id="" placeholder='Alamat pegawai' required onChange={(e) => setData('alamat', e.target.value)}>
                                </textarea>
                                {/* {errors.nama && (
                                <span className="mt-1 text-sm text-error">{errors.nama}</span>
                            )} */}
                            </label>

                        </div>

                        <div>
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Foto</span>
                                <input
                                    type="file"
                                    name="foto"
                                    onChange={(e) => setData('foto', e.target.files[0])}
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    className="file-input file-input-bordered w-full"
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
                                    : itemEdit
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Data'}
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
                                    <th>Foto</th>
                                    <th>Nama</th>
                                    <th>Nik</th>
                                    <th>Nip</th>
                                    <th>jabatan</th>
                                    <th>No Hp</th>
                                    <th>Alamat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pegawai.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="h-12 w-12 rounded-lg">
                                                    <img
                                                        src={item.foto}
                                                        alt={item.nama}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td>{item.nama}</td>
                                        <td>{item.nik}</td>
                                        <td>{item.nip}</td>
                                        <td>{item.jb.jabatan}</td>
                                        <td>{item.nohp}</td>
                                        <td>{item.alamat}</td>
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

            {
                createModal &&
                renderModal('Tambah Jabatan', 'Masukkan data jabatan.')
            }


            {editModal && renderModal('Edit Jabatan', '')}
        </AdminLayout >
    )
}
