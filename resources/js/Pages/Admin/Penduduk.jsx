import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Penduduk({ penduduk, dusunList, search, dusunFilter }) {
    const { flash = {} } = usePage().props;
    const [searchVal, setSearchVal] = useState(search || '');
    const [dusunVal, setDusunVal] = useState(dusunFilter || '');

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

    useEffect(() => {
        if (flash.success) {
            Swal.fire({ title: 'Berhasil', text: flash.success, icon: 'success', timer: 1800, showConfirmButton: false, });
        }
        if (flash.error) {
            Swal.fire({ title: 'Gagal', text: flash.error, icon: 'error', buttonsStyling: false, customClass: { confirmButton: 'btn btn-error text-white' }, });
        }
    }, [flash]);

    return (
        <AdminLayout>
            <Head title="Data Penduduk" />
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Data Penduduk</h2>
                    <p className="mt-1 text-sm text-gray-500">Total {penduduk.total} penduduk.</p>
                </div>

                <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3 rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
                    <label className="form-control min-w-[200px] flex-1">
                        <span className="label-text mb-1 font-medium text-sm">Cari NIK / Nama</span>
                        <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)} className="input input-bordered input-sm w-full" placeholder="Ketik NIK atau nama..." />
                    </label>
                    <label className="form-control min-w-[150px]">
                        <span className="label-text mb-1 font-medium text-sm">Dusun</span>
                        <select value={dusunVal} onChange={e => setDusunVal(e.target.value)} className="select select-bordered select-sm w-full">
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
                                    <th>Dusun</th>
                                    <th>RT / RW</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Tempat / Tgl Lahir</th>
                                    <th>Status Kawin</th>
                                    <th>Pekerjaan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {penduduk.data.length > 0 ? penduduk.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{penduduk.from + i}</td>
                                        <td className="font-mono text-xs">{item.nik}</td>
                                        <td className="font-medium">{item.nama}</td>
                                        <td>{item.dusun}</td>
                                        <td>{item.rt} / {item.rw}</td>
                                        <td>{item.sex === '1' ? 'L' : item.sex === '2' ? 'P' : item.sex}</td>
                                        <td>{item.tempatlahir ? item.tempatlahir + ', ' : ''}{item.tanggallahir || '-'}</td>
                                        <td>{item.status_kawin === '1' ? 'Belum Kawin' : item.status_kawin === '2' ? 'Kawin' : item.status_kawin === '3' ? 'Cerai Hidup' : item.status_kawin === '4' ? 'Cerai Mati' : item.status_kawin || '-'}</td>
                                        <td>{item.pekerjaan_id || '-'}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="9" className="py-8 text-center text-gray-500">Tidak ada data penduduk.</td></tr>
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
        </AdminLayout>
    );
}
