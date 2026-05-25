import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function ProfilDesa({ profil }) {
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
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
    })

    const [showForm, setShowForm] = useState(false)
    const [itemEdit, setItemEdit] = useState(null)

    const closeForm = () => {
        setShowForm(false)
        setItemEdit(null)
    }

    const openCreateForm = () => {
        reset()
        setItemEdit(null)
        setShowForm(true)
    }

    const openEditForm = (item) => {
        setItemEdit(item)
        setShowForm(true)
        setData({
            nama_desa: item.nama_desa,
            kode_desa: item.kode_desa || '',
            nama_kecamatan: item.nama_kecamatan || '',
            nama_kabupaten: item.nama_kabupaten || '',
            nama_provinsi: item.nama_provinsi || '',
            alamat_desa: item.alamat_desa || '',
            kode_pos: item.kode_pos || '',
            telepon: item.telepon || '',
            email: item.email || '',
            website: item.website || '',
            logo: null,
            foto_kantor: null,
            kepala_desa: item.kepala_desa || '',
            sambutan: item.sambutan || '',
            visi: item.visi || '',
            misi: item.misi || '',
            sejarah: item.sejarah || '',
            luas_wilayah: item.luas_wilayah || '',
            jumlah_penduduk: item.jumlah_penduduk || '',
            latitude: item.latitude || '',
            longitude: item.longitude || '',
            facebook: item.facebook || '',
            instagram: item.instagram || '',
            youtube: item.youtube || '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (itemEdit) {
            put('/admin/profil-desa/' + itemEdit.id, {
                onSuccess: () => {
                    reset()
                    closeForm()
                },
            })
        } else {
            post('/admin/profil-desa', {
                onSuccess: () => {
                    reset()
                    closeForm()
                },
            })
        }
    }

    const hapus = (item) => {
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
                destroy(`/admin/profil-desa/${item.id}`, {
                    onSuccess: () => {
                        reset()
                    },
                })
            }
        })
    }

    const formSection = (
        <div className="mb-6">
            <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-4">{itemEdit ? 'Edit Profil Desa' : 'Tambah Profil Desa'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Nama Desa</span>
                            <input type="text" name="nama_desa" value={data.nama_desa} onChange={(e) => setData('nama_desa', e.target.value)} className="input input-bordered w-full" required />
                            {errors.nama_desa && <div className="text-sm text-error mt-1">{errors.nama_desa}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Logo</span>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setData('logo', e.target.files[0])} />
                            {errors.logo && <div className="text-sm text-error mt-1">{errors.logo}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kecamatan</span>
                            <input type="text" name="nama_kecamatan" value={data.nama_kecamatan} onChange={(e) => setData('nama_kecamatan', e.target.value)} className="input input-bordered w-full" required />
                            {errors.nama_kecamatan && <div className="text-sm text-error mt-1">{errors.nama_kecamatan}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kabupaten</span>
                            <input type="text" name="nama_kabupaten" value={data.nama_kabupaten} onChange={(e) => setData('nama_kabupaten', e.target.value)} className="input input-bordered w-full" required />
                            {errors.nama_kabupaten && <div className="text-sm text-error mt-1">{errors.nama_kabupaten}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Provinsi</span>
                            <input type="text" name="nama_provinsi" value={data.nama_provinsi} onChange={(e) => setData('nama_provinsi', e.target.value)} className="input input-bordered w-full" required />
                            {errors.nama_provinsi && <div className="text-sm text-error mt-1">{errors.nama_provinsi}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kepala Desa</span>
                            <input type="text" name="kepala_desa" value={data.kepala_desa} onChange={(e) => setData('kepala_desa', e.target.value)} className="input input-bordered w-full" />
                            {errors.kepala_desa && <div className="text-sm text-error mt-1">{errors.kepala_desa}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Jumlah Penduduk</span>
                            <input type="number" name="jumlah_penduduk" value={data.jumlah_penduduk} onChange={(e) => setData('jumlah_penduduk', e.target.value)} className="input input-bordered w-full" />
                            {errors.jumlah_penduduk && <div className="text-sm text-error mt-1">{errors.jumlah_penduduk}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Foto Kantor</span>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setData('foto_kantor', e.target.files[0])} />
                            {errors.foto_kantor && <div className="text-sm text-error mt-1">{errors.foto_kantor}</div>}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Alamat Desa</span>
                            <textarea className="textarea textarea-bordered w-full" name="alamat_desa" value={data.alamat_desa} onChange={(e) => setData('alamat_desa', e.target.value)} />
                            {errors.alamat_desa && <div className="text-sm text-error mt-1">{errors.alamat_desa}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Kode Pos</span>
                            <input type="text" name="kode_pos" value={data.kode_pos} onChange={(e) => setData('kode_pos', e.target.value)} className="input input-bordered w-full" />
                            {errors.kode_pos && <div className="text-sm text-error mt-1">{errors.kode_pos}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Telepon</span>
                            <input type="text" name="telepon" value={data.telepon} onChange={(e) => setData('telepon', e.target.value)} className="input input-bordered w-full" />
                            {errors.telepon && <div className="text-sm text-error mt-1">{errors.telepon}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Email</span>
                            <input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input input-bordered w-full" />
                            {errors.email && <div className="text-sm text-error mt-1">{errors.email}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Website</span>
                            <input type="text" name="website" value={data.website} onChange={(e) => setData('website', e.target.value)} className="input input-bordered w-full" />
                            {errors.website && <div className="text-sm text-error mt-1">{errors.website}</div>}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Sambutan</span>
                            <textarea className="textarea textarea-bordered w-full" name="sambutan" value={data.sambutan} onChange={(e) => setData('sambutan', e.target.value)} />
                            {errors.sambutan && <div className="text-sm text-error mt-1">{errors.sambutan}</div>}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Visi</span>
                            <textarea className="textarea textarea-bordered w-full" name="visi" value={data.visi} onChange={(e) => setData('visi', e.target.value)} />
                            {errors.visi && <div className="text-sm text-error mt-1">{errors.visi}</div>}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Misi</span>
                            <textarea className="textarea textarea-bordered w-full" name="misi" value={data.misi} onChange={(e) => setData('misi', e.target.value)} />
                            {errors.misi && <div className="text-sm text-error mt-1">{errors.misi}</div>}
                        </label>

                        <label className="form-control w-full md:col-span-2">
                            <span className="label-text mb-2 font-medium">Sejarah</span>
                            <textarea className="textarea textarea-bordered w-full" name="sejarah" value={data.sejarah} onChange={(e) => setData('sejarah', e.target.value)} />
                            {errors.sejarah && <div className="text-sm text-error mt-1">{errors.sejarah}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Luas Wilayah</span>
                            <input type="text" name="luas_wilayah" value={data.luas_wilayah} onChange={(e) => setData('luas_wilayah', e.target.value)} className="input input-bordered w-full" />
                            {errors.luas_wilayah && <div className="text-sm text-error mt-1">{errors.luas_wilayah}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Latitude</span>
                            <input type="text" name="latitude" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} className="input input-bordered w-full" />
                            {errors.latitude && <div className="text-sm text-error mt-1">{errors.latitude}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Longitude</span>
                            <input type="text" name="longitude" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} className="input input-bordered w-full" />
                            {errors.longitude && <div className="text-sm text-error mt-1">{errors.longitude}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Facebook</span>
                            <input type="text" name="facebook" value={data.facebook} onChange={(e) => setData('facebook', e.target.value)} className="input input-bordered w-full" />
                            {errors.facebook && <div className="text-sm text-error mt-1">{errors.facebook}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Instagram</span>
                            <input type="text" name="instagram" value={data.instagram} onChange={(e) => setData('instagram', e.target.value)} className="input input-bordered w-full" />
                            {errors.instagram && <div className="text-sm text-error mt-1">{errors.instagram}</div>}
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-2 font-medium">Youtube</span>
                            <input type="text" name="youtube" value={data.youtube} onChange={(e) => setData('youtube', e.target.value)} className="input input-bordered w-full" />
                            {errors.youtube && <div className="text-sm text-error mt-1">{errors.youtube}</div>}
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeForm} className="btn btn-ghost">Batal</button>
                        <button type="submit" disabled={processing} className="btn btn-primary">{processing ? 'Menyimpan...' : itemEdit ? 'Simpan Perubahan' : 'Tambah Profil'}</button>
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
                        <h2 className="text-2xl font-bold text-gray-900">Profil Desa</h2>
                        <p className="mt-1 text-sm text-gray-500">Kelola data profil desa.</p>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={openCreateForm} className="btn btn-primary">Tambah Profil</button>
                        {showForm && <button type="button" onClick={closeForm} className="btn btn-ghost">Tutup Form</button>}
                    </div>
                </div>

                {showForm && formSection}

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
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profil.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="h-12 w-12 rounded-lg overflow-hidden bg-base-200">
                                                    {item.logo ? <img src={item.logo} alt={item.nama_desa} className="object-cover h-full w-full" /> : <div className="flex h-full items-center justify-center text-xs text-gray-500">No logo</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.nama_desa}</td>
                                        <td>{item.nama_kecamatan}</td>
                                        <td>{item.nama_kabupaten}</td>
                                        <td>{item.nama_provinsi}</td>
                                        <td>{item.kepala_desa || '-'}</td>
                                        <td>{item.jumlah_penduduk ?? '-'}</td>
                                        <td>
                                            <div className="h-12 w-16 rounded overflow-hidden bg-base-200">
                                                {item.foto_kantor ? <img src={item.foto_kantor} alt={`Kantor ${item.nama_desa}`} className="object-cover h-full w-full" /> : <div className="flex h-full items-center justify-center text-xs text-gray-500">No foto</div>}
                                            </div>
                                        </td>
                                        <td className="space-y-2">
                                            <button className="btn btn-warning btn-sm w-full" onClick={() => openEditForm(item)}>Edit</button>
                                            <button className="btn btn-error btn-sm w-full" onClick={() => hapus(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}