import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const emptyForm = {
    nik: '',
    nama: '',
    no_kk: '',
    dusun: '',
    rt: '',
    rw: '',
    sex: '',
    tempatlahir: '',
    tanggallahir: '',
    agama_id: '',
    pekerjaan_id: '',
    status_kawin: '',
    kk_level: '0',
    alamat: '',
    nama_ayah: '',
    nama_ibu: '',
};

const sexLabel = { '1': 'Laki-laki', '2': 'Perempuan' };

export default function Penduduk({ penduduk, dusunList, search, dusunFilter, agamaOptions, pekerjaanOptions, kawinOptions }) {
    const { flash = {}, errors = {} } = usePage().props;
    const [searchVal, setSearchVal] = useState(search || '');
    const [dusunVal, setDusunVal] = useState(dusunFilter || '');
    const [form, setForm] = useState(emptyForm);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingItem(null);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        resetForm();
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setForm({
            nik: item.nik || '',
            nama: item.nama || '',
            no_kk: item.no_kk || '',
            dusun: item.dusun || '',
            rt: item.rt || '',
            rw: item.rw || '',
            sex: item.sex || '',
            tempatlahir: item.tempatlahir || '',
            tanggallahir: item.tanggallahir || '',
            agama_id: item.agama_id || '',
            pekerjaan_id: item.pekerjaan_id || '',
            status_kawin: item.status_kawin || '',
            kk_level: item.kk_level || '0',
            alamat: item.alamat || '',
            nama_ayah: item.nama_ayah || '',
            nama_ibu: item.nama_ibu || '',
        });
        setIsEditModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? '1' : '0') : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        const options = {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => closeModals(),
        };

        if (editingItem) {
            router.post(`/admin/penduduk/${editingItem.id}`, form, options);
        } else {
            router.post('/admin/penduduk', form, options);
        }
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus data penduduk?',
            text: `Data "${item.nama}" (NIK: ${item.nik}) akan dihapus permanen.`,
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
                router.delete(`/admin/penduduk/${item.id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/penduduk', {
            search: searchVal,
            dusun: dusunVal,
        }, { preserveState: true, replace: true });
    };

    const handleReset = () => {
        setSearchVal('');
        setDusunVal('');
        router.get('/admin/penduduk', {}, { preserveState: true, replace: true });
    };

    const getAgamaLabel = (id) => {
        if (!id) return '-';
        const found = agamaOptions.find((a) => String(a.id) === String(id));
        return found ? found.label : id;
    };

    const getPekerjaanLabel = (id) => {
        if (!id) return '-';
        const found = pekerjaanOptions.find((p) => String(p.id) === String(id));
        return found ? found.label : id;
    };

    const getKawinLabel = (id) => {
        if (!id) return '-';
        const found = kawinOptions.find((k) => String(k.id) === String(id));
        return found ? found.label : id;
    };

    const renderFormFields = () => (
        <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">NIK <span className="text-error">*</span></span>
                <input type="text" name="nik" value={form.nik} onChange={handleChange} className="input input-bordered w-full" placeholder="Nomor Induk Kependudukan" maxLength="25" />
                {errors.nik && <span className="mt-1 text-sm text-error">{errors.nik}</span>}
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">No. KK</span>
                <input type="text" name="no_kk" value={form.no_kk} onChange={handleChange} className="input input-bordered w-full" placeholder="Nomor Kartu Keluarga" maxLength="25" />
                {errors.no_kk && <span className="mt-1 text-sm text-error">{errors.no_kk}</span>}
            </label>

            <label className="form-control w-full md:col-span-2">
                <span className="label-text mb-1 font-medium">Nama <span className="text-error">*</span></span>
                <input type="text" name="nama" value={form.nama} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama lengkap" />
                {errors.nama && <span className="mt-1 text-sm text-error">{errors.nama}</span>}
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Jenis Kelamin</span>
                <select name="sex" value={form.sex} onChange={handleChange} className="select select-bordered w-full">
                    <option value="">-- Pilih --</option>
                    <option value="1">Laki-laki</option>
                    <option value="2">Perempuan</option>
                </select>
                {errors.sex && <span className="mt-1 text-sm text-error">{errors.sex}</span>}
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Dusun</span>
                <select name="dusun" value={form.dusun} onChange={handleChange} className="select select-bordered w-full">
                    <option value="">-- Pilih --</option>
                    {dusunList.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.dusun && <span className="mt-1 text-sm text-error">{errors.dusun}</span>}
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">RT</span>
                <input type="text" name="rt" value={form.rt} onChange={handleChange} className="input input-bordered w-full" placeholder="RT" maxLength="10" />
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">RW</span>
                <input type="text" name="rw" value={form.rw} onChange={handleChange} className="input input-bordered w-full" placeholder="RW" maxLength="10" />
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Tempat Lahir</span>
                <input type="text" name="tempatlahir" value={form.tempatlahir} onChange={handleChange} className="input input-bordered w-full" placeholder="Kota lahir" />
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Tanggal Lahir</span>
                <input type="date" name="tanggallahir" value={form.tanggallahir} onChange={handleChange} className="input input-bordered w-full" />
                {errors.tanggallahir && <span className="mt-1 text-sm text-error">{errors.tanggallahir}</span>}
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Agama</span>
                <select name="agama_id" value={form.agama_id} onChange={handleChange} className="select select-bordered w-full">
                    <option value="">-- Pilih --</option>
                    {agamaOptions.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
                </select>
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Pekerjaan</span>
                <select name="pekerjaan_id" value={form.pekerjaan_id} onChange={handleChange} className="select select-bordered w-full">
                    <option value="">-- Pilih --</option>
                    {pekerjaanOptions.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Status Kawin</span>
                <select name="status_kawin" value={form.status_kawin} onChange={handleChange} className="select select-bordered w-full">
                    <option value="">-- Pilih --</option>
                    {kawinOptions.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                </select>
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Nama Ayah</span>
                <input type="text" name="nama_ayah" value={form.nama_ayah} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama ayah" />
            </label>

            <label className="form-control w-full">
                <span className="label-text mb-1 font-medium">Nama Ibu</span>
                <input type="text" name="nama_ibu" value={form.nama_ibu} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama ibu" />
            </label>

            <div className="md:col-span-2 flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="kk_level" checked={form.kk_level === '1'} onChange={handleChange} className="checkbox checkbox-primary" />
                    <span className="text-sm font-medium">Kepala Keluarga</span>
                </label>
            </div>

            <label className="form-control w-full md:col-span-2">
                <span className="label-text mb-1 font-medium">Alamat</span>
                <textarea name="alamat" value={form.alamat} onChange={handleChange} className="textarea textarea-bordered w-full" rows="2" placeholder="Alamat lengkap"></textarea>
            </label>
        </div>
    );

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
                    {renderFormFields()}

                    <div className="flex justify-end gap-3 border-t border-base-300 pt-5">
                        <button type="button" onClick={closeModals} className="btn btn-ghost">Batal</button>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Data'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    useEffect(() => {
        if (flash.success) {
            Swal.fire({ title: 'Berhasil', text: flash.success, icon: 'success', timer: 1800, showConfirmButton: false });
        }
        if (flash.error) {
            Swal.fire({ title: 'Gagal', text: flash.error, icon: 'error', buttonsStyling: false, customClass: { confirmButton: 'btn btn-error text-white' } });
        }
    }, [flash]);

    return (
        <AdminLayout>
            <Head title="Data Penduduk" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Data Penduduk</h2>
                        <p className="mt-1 text-sm text-gray-500">Total {penduduk.total} penduduk. Kelola data kependudukan desa.</p>
                    </div>
                    <button type="button" onClick={openCreateModal} className="btn btn-primary">
                        <i className="fas fa-plus mr-1.5"></i>Tambah Penduduk
                    </button>
                </div>

                <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3 rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
                    <label className="form-control min-w-[200px] flex-1">
                        <span className="label-text mb-1 font-medium text-sm">Cari NIK / Nama / No. KK</span>
                        <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)} className="input input-bordered input-sm w-full" placeholder="Ketik NIK, nama, atau no. KK..." />
                    </label>
                    <label className="form-control min-w-[150px]">
                        <span className="label-text mb-1 font-medium text-sm">Dusun</span>
                        <select value={dusunVal} onChange={e => setDusunVal(e.target.value)} className="select select-bordered select-sm text-xs w-full">
                            <option value="">Semua Dusun</option>
                            {dusunList.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </label>
                    <button type="submit" className="btn btn-success btn-sm">Cari</button>
                    <button type="button" onClick={handleReset} className="btn btn-ghost btn-sm">Reset</button>
                </form>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra text-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIK</th>
                                    <th>Nama</th>
                                    <th>No. KK</th>
                                    <th>Dusun</th>
                                    <th>RT / RW</th>
                                    <th>JK</th>
                                    <th>Agama</th>
                                    <th>Status Kawin</th>
                                    <th>Pekerjaan</th>
                                    <th>KK</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {penduduk.data.length > 0 ? penduduk.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{penduduk.from + i}</td>
                                        <td className="font-mono text-xs">{item.nik}</td>
                                        <td className="font-medium">{item.nama}</td>
                                        <td className="font-mono text-xs">{item.no_kk || '-'}</td>
                                        <td>{item.dusun || '-'}</td>
                                        <td>{item.rt || '-'} / {item.rw || '-'}</td>
                                        <td>{sexLabel[item.sex] || '-'}</td>
                                        <td>{getAgamaLabel(item.agama_id)}</td>
                                        <td>{getKawinLabel(item.status_kawin)}</td>
                                        <td className="max-w-[140px] truncate" title={getPekerjaanLabel(item.pekerjaan_id)}>{getPekerjaanLabel(item.pekerjaan_id)}</td>
                                        <td>{item.kk_level === '1' ? <span className="badge badge-success badge-sm">Ya</span> : '-'}</td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button type="button" onClick={() => openEditModal(item)} className="btn btn-warning btn-xs">Edit</button>
                                                <button type="button" onClick={() => handleDelete(item)} className="btn btn-error btn-xs text-white">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="12" className="py-8 text-center text-gray-500">Tidak ada data penduduk.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between border-t border-base-300 px-4 py-3">
                        <span className="text-sm text-gray-500">
                            Menampilkan {penduduk.from}–{penduduk.to} dari {penduduk.total}
                        </span>
                        <div className="join">
                            {penduduk.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                    className={`join-item btn btn-sm ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveState preserveScroll />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && renderModal('Tambah Penduduk')}
            {isEditModalOpen && renderModal('Edit Penduduk')}
        </AdminLayout>
    );
}
