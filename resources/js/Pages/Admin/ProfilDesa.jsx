import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const emptyForm = {
    nama_desa: '',
    kode_desa: '',
    nama_kecamatan: '',
    nama_kabupaten: '',
    nama_provinsi: '',
    alamat_desa: '',
    kode_pos: '',
    telepon: '',
    email: '',
    website: '',
    logo: null,
    foto_kantor: null,
    kepala_desa: '',
    sambutan: '',
    visi: '',
    misi: '',
    sejarah: '',
    luas_wilayah: '',
    jumlah_penduduk: '',
    latitude: '',
    longitude: '',
    facebook: '',
    instagram: '',
    youtube: '',
}

export default function ProfilDesa({ profil }) {
    const { flash = {}, errors = {} } = usePage().props
    const [form, setForm] = useState(emptyForm)
    const [editingItem, setEditingItem] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [processing, setProcessing] = useState(false)

    const resetForm = () => {
        setForm(emptyForm)
        setEditingItem(null)
    }

    const closeModals = () => {
        setIsCreateModalOpen(false)
        setIsEditModalOpen(false)
        resetForm()
    }

    const openCreateModal = () => {
        resetForm()
        setIsCreateModalOpen(true)
    }

    const openEditModal = (item) => {
        setEditingItem(item)
        setForm({
            nama_desa: item.nama_desa ?? '',
            kode_desa: item.kode_desa ?? '',
            nama_kecamatan: item.nama_kecamatan ?? '',
            nama_kabupaten: item.nama_kabupaten ?? '',
            nama_provinsi: item.nama_provinsi ?? '',
            alamat_desa: item.alamat_desa ?? '',
            kode_pos: item.kode_pos ?? '',
            telepon: item.telepon ?? '',
            email: item.email ?? '',
            website: item.website ?? '',
            logo: null,
            foto_kantor: null,
            kepala_desa: item.kepala_desa ?? '',
            sambutan: item.sambutan ?? '',
            visi: item.visi ?? '',
            misi: item.misi ?? '',
            sejarah: item.sejarah ?? '',
            luas_wilayah: item.luas_wilayah ?? '',
            jumlah_penduduk: item.jumlah_penduduk ?? '',
            latitude: item.latitude ?? '',
            longitude: item.longitude ?? '',
            facebook: item.facebook ?? '',
            instagram: item.instagram ?? '',
            youtube: item.youtube ?? '',
        })
        setIsEditModalOpen(true)
    }

    const handleChange = (event) => {
        const { name, value, files } = event.target
        setForm((current) => ({
            ...current,
            [name]: files ? files[0] : value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setProcessing(true)

        const options = {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => closeModals(),
        }

        if (editingItem) {
            router.post(`/admin/profil-desa/${editingItem.id}`, form, options)
            return
        }

        router.post('/admin/profil-desa', form, options)
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus profil desa?',
            text: `Profil "${item.nama_desa}" akan dihapus permanen.`,
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
                router.delete(`/admin/profil-desa/${item.id}`, {
                    preserveScroll: true,
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
                            <span className="label-text mb-2 font-medium">Nama Desa</span>
                            <input type="text" name="nama_desa" value={form.nama_desa} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama desa" />
                            {errors.nama_desa && <span className="mt-1 text-sm text-error">{errors.nama_desa}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kode Desa</span>
                            <input type="text" name="kode_desa" value={form.kode_desa} onChange={handleChange} className="input input-bordered w-full" placeholder="Kode desa" />
                            {errors.kode_desa && <span className="mt-1 text-sm text-error">{errors.kode_desa}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kecamatan</span>
                            <input type="text" name="nama_kecamatan" value={form.nama_kecamatan} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama kecamatan" />
                            {errors.nama_kecamatan && <span className="mt-1 text-sm text-error">{errors.nama_kecamatan}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kabupaten</span>
                            <input type="text" name="nama_kabupaten" value={form.nama_kabupaten} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama kabupaten" />
                            {errors.nama_kabupaten && <span className="mt-1 text-sm text-error">{errors.nama_kabupaten}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Provinsi</span>
                            <input type="text" name="nama_provinsi" value={form.nama_provinsi} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama provinsi" />
                            {errors.nama_provinsi && <span className="mt-1 text-sm text-error">{errors.nama_provinsi}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kepala Desa</span>
                            <input type="text" name="kepala_desa" value={form.kepala_desa} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama kepala desa" />
                            {errors.kepala_desa && <span className="mt-1 text-sm text-error">{errors.kepala_desa}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Jumlah Penduduk</span>
                            <input type="number" name="jumlah_penduduk" value={form.jumlah_penduduk} onChange={handleChange} className="input input-bordered w-full" placeholder="0" />
                            {errors.jumlah_penduduk && <span className="mt-1 text-sm text-error">{errors.jumlah_penduduk}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Luas Wilayah</span>
                            <input type="text" name="luas_wilayah" value={form.luas_wilayah} onChange={handleChange} className="input input-bordered w-full" placeholder="Contoh: 1,250" />
                            {errors.luas_wilayah && <span className="mt-1 text-sm text-error">{errors.luas_wilayah}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kode Pos</span>
                            <input type="text" name="kode_pos" value={form.kode_pos} onChange={handleChange} className="input input-bordered w-full" placeholder="Kode pos" />
                            {errors.kode_pos && <span className="mt-1 text-sm text-error">{errors.kode_pos}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Telepon</span>
                            <input type="text" name="telepon" value={form.telepon} onChange={handleChange} className="input input-bordered w-full" placeholder="Nomor telepon" />
                            {errors.telepon && <span className="mt-1 text-sm text-error">{errors.telepon}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Email</span>
                            <input type="email" name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" placeholder="email@desa.id" />
                            {errors.email && <span className="mt-1 text-sm text-error">{errors.email}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Website</span>
                            <input type="text" name="website" value={form.website} onChange={handleChange} className="input input-bordered w-full" placeholder="https://" />
                            {errors.website && <span className="mt-1 text-sm text-error">{errors.website}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Latitude</span>
                            <input type="text" name="latitude" value={form.latitude} onChange={handleChange} className="input input-bordered w-full" placeholder="Contoh: 3.82088" />
                            {errors.latitude && <span className="mt-1 text-sm text-error">{errors.latitude}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Longitude</span>
                            <input type="text" name="longitude" value={form.longitude} onChange={handleChange} className="input input-bordered w-full" placeholder="Contoh: 98.21595" />
                            {errors.longitude && <span className="mt-1 text-sm text-error">{errors.longitude}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Facebook</span>
                            <input type="text" name="facebook" value={form.facebook} onChange={handleChange} className="input input-bordered w-full" placeholder="URL Facebook" />
                            {errors.facebook && <span className="mt-1 text-sm text-error">{errors.facebook}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Instagram</span>
                            <input type="text" name="instagram" value={form.instagram} onChange={handleChange} className="input input-bordered w-full" placeholder="URL Instagram" />
                            {errors.instagram && <span className="mt-1 text-sm text-error">{errors.instagram}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Youtube</span>
                            <input type="text" name="youtube" value={form.youtube} onChange={handleChange} className="input input-bordered w-full" placeholder="URL Youtube" />
                            {errors.youtube && <span className="mt-1 text-sm text-error">{errors.youtube}</span>}
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Alamat Desa</span>
                        <textarea name="alamat_desa" value={form.alamat_desa} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Alamat lengkap desa" />
                        {errors.alamat_desa && <span className="mt-1 text-sm text-error">{errors.alamat_desa}</span>}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Sambutan</span>
                        <textarea name="sambutan" value={form.sambutan} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Kata sambutan kepala desa" />
                        {errors.sambutan && <span className="mt-1 text-sm text-error">{errors.sambutan}</span>}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Visi</span>
                        <textarea name="visi" value={form.visi} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Visi desa" />
                        {errors.visi && <span className="mt-1 text-sm text-error">{errors.visi}</span>}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Misi</span>
                        <textarea name="misi" value={form.misi} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Misi desa" />
                        {errors.misi && <span className="mt-1 text-sm text-error">{errors.misi}</span>}
                    </label>

                    <label className="form-control w-full">
                        <span className="label-text mb-2 font-medium">Sejarah</span>
                        <textarea name="sejarah" value={form.sejarah} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Sejarah desa" />
                        {errors.sejarah && <span className="mt-1 text-sm text-error">{errors.sejarah}</span>}
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Logo {editingItem ? '(kosongkan jika tidak diganti)' : ''}</span>
                            <input type="file" name="logo" onChange={handleChange} accept="image/png,image/jpeg,image/jpg,image/webp" className="file-input file-input-bordered w-full" />
                            {errors.logo && <span className="mt-1 text-sm text-error">{errors.logo}</span>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Foto Kantor {editingItem ? '(kosongkan jika tidak diganti)' : ''}</span>
                            <input type="file" name="foto_kantor" onChange={handleChange} accept="image/png,image/jpeg,image/jpg,image/webp" className="file-input file-input-bordered w-full" />
                            {errors.foto_kantor && <span className="mt-1 text-sm text-error">{errors.foto_kantor}</span>}
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Profil'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: 'Berhasil',
                text: flash.success,
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
            })
        }

        if (flash.error) {
            Swal.fire({
                title: 'Gagal',
                text: flash.error,
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-error text-white',
                },
            })
        }
    }, [flash.error, flash.success])

    return (
        <AdminLayout>
            <Head title="Profil Desa" />

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Profil Desa</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola data profil desa.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">Tambah Profil</button>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Logo</th>
                                    <th>Nama Desa</th>
                                    <th>Kecamatan</th>
                                    <th>Kabupaten</th>
                                    <th>Provinsi</th>
                                    <th>Kepala Desa</th>
                                    <th>Jumlah Penduduk</th>
                                    <th>Foto Kantor</th>
                                    <th className="text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profil.length > 0 ? (
                                    profil.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-base-200">
                                                        {item.logo ? <img src={item.logo} alt={item.nama_desa} className="object-cover h-full w-full" /> : <div className="flex h-full items-center justify-center text-xs text-gray-500">No</div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-medium">{item.nama_desa}</td>
                                            <td>{item.nama_kecamatan}</td>
                                            <td>{item.nama_kabupaten}</td>
                                            <td>{item.nama_provinsi}</td>
                                            <td>{item.kepala_desa || '-'}</td>
                                            <td>{item.jumlah_penduduk ?? '-'}</td>
                                            <td>
                                                <div className="h-12 w-16 rounded overflow-hidden bg-base-200">
                                                    {item.foto_kantor ? <img src={item.foto_kantor} alt={`Kantor ${item.nama_desa}`} className="object-cover h-full w-full" /> : <div className="flex h-full items-center justify-center text-xs text-gray-500">No</div>}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-end gap-2">
                                                    <button type="button" onClick={() => openEditModal(item)} className="btn btn-warning btn-sm">Edit</button>
                                                    <button type="button" onClick={() => handleDelete(item)} className="btn btn-error btn-sm text-white">Hapus</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="py-8 text-center text-gray-500">Belum ada data profil desa.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Profil Desa')}
            {isEditModalOpen && renderModal('Edit Profil Desa')}
        </AdminLayout>
    )
}
