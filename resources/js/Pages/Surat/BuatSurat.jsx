import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useSuratLoading } from '@/hooks/useSuratLoading';

const fieldsConfig = {
    domisili: [
        { name: 'alamat_domisili', label: 'Alamat Domisili', type: 'textarea', required: true },
        { name: 'rt', label: 'RT', type: 'text' },
        { name: 'rw', label: 'RW', type: 'text' },
        { name: 'keperluan', label: 'Keperluan', type: 'textarea' },
    ],
    tidak_mampu: [
        { name: 'penghasilan', label: 'Penghasilan per Bulan', type: 'text' },
        { name: 'keterangan_tidak_mampu', label: 'Keterangan', type: 'textarea' },
        { name: 'keperluan', label: 'Keperluan', type: 'textarea' },
    ],
    usaha: [
        { name: 'nama_usaha', label: 'Nama Usaha', type: 'text', required: true },
        { name: 'bidang_usaha', label: 'Bidang Usaha', type: 'text' },
        { name: 'alamat_usaha', label: 'Alamat Usaha', type: 'textarea' },
        { name: 'keperluan', label: 'Keperluan', type: 'textarea' },
    ],
    belum_menikah: [
        { name: 'keperluan_surat', label: 'Keperluan Surat', type: 'textarea', required: true },
    ],
    pindah: [
        { name: 'alamat_tujuan', label: 'Alamat Tujuan Pindah', type: 'textarea', required: true },
        { name: 'alasan_pindah', label: 'Alasan Pindah', type: 'textarea' },
        { name: 'rt', label: 'RT', type: 'text' },
        { name: 'rw', label: 'RW', type: 'text' },
        { name: 'keperluan', label: 'Keperluan', type: 'textarea' },
    ],
};

function SkeletonBuatSurat() {
    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 md:px-6">
                <div className="h-4 w-40 rounded bg-gray-200 animate-pulse mb-6" />
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-6 md:p-8">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-white/20 animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-6 w-40 rounded bg-white/30 animate-pulse" />
                                <div className="h-3 w-56 rounded bg-white/20 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 space-y-5">
                        <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                            <div className="h-3 w-28 rounded bg-gray-200 animate-pulse mb-4" />
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i}>
                                        <div className="h-2 w-12 rounded bg-gray-200 animate-pulse mb-1" />
                                        <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i}>
                                <div className="h-3 w-20 rounded bg-gray-200 animate-pulse mb-2" />
                                <div className="h-20 w-full rounded-lg bg-gray-200 animate-pulse" />
                            </div>
                        ))}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <div className="h-10 w-20 rounded-lg bg-gray-200 animate-pulse" />
                            <div className="h-10 w-32 rounded-lg bg-gray-200 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BuatSurat({ jenis, jenisLabel, penduduk, dusunList }) {
    const { flash = {}, errors: serverErrors = {} } = usePage().props;
    const loading = useSuratLoading();
    const fields = fieldsConfig[jenis] || [];

    const buildInitial = () => {
        const init = { jenis };
        fields.forEach((f) => { init[f.name] = ''; });
        return init;
    };

    const [form, setForm] = useState(buildInitial);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
        }
    }, [serverErrors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/surat/buat', form, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onError: (err) => setErrors(err),
            onSuccess: () => {
                // redirect handled by server
            },
        });
    };

    if (loading) return <SkeletonBuatSurat />;

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-file-lines"></i>
                        </div>
                        <span className="text-base font-bold text-gray-800 md:text-lg">Buat Surat</span>
                    </div>
                    <Link href="/surat/dashboard" className="btn btn-ghost btn-sm text-gray-600">
                        <i className="fas fa-arrow-left"></i>
                        <span className="hidden md:inline ml-1">Kembali</span>
                    </Link>
                </div>
            </nav>

            <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 md:px-6">
                <Link href="/surat/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-6">
                    <i className="fas fa-arrow-left"></i>
                    Kembali ke Dashboard
                </Link>

                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white md:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                                <i className="fas fa-file-lines text-xl"></i>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold md:text-2xl">{jenisLabel}</h1>
                                <p className="text-sm text-white/80">Isi data dengan benar untuk pengajuan surat.</p>
                            </div>
                        </div>
                    </div>

                    {/* Data pemohon (auto) */}
                    <div className="p-6 md:p-8">
                        <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 mb-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Data Pemohon</p>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <div><span className="text-gray-500">NIK</span><p className="font-medium text-gray-900">{penduduk?.nik || '-'}</p></div>
                                <div><span className="text-gray-500">Nama</span><p className="font-medium text-gray-900">{penduduk?.nama || '-'}</p></div>
                                <div><span className="text-gray-500">Dusun</span><p className="font-medium text-gray-900">{penduduk?.dusun || '-'}</p></div>
                                <div><span className="text-gray-500">RT / RW</span><p className="font-medium text-gray-900">{penduduk?.rt || '-'} / {penduduk?.rw || '-'}</p></div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {fields.map((f) => (
                                <div key={f.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        {f.label} {f.required && <span className="text-error">*</span>}
                                    </label>
                                    {f.type === 'textarea' ? (
                                        <textarea
                                            name={f.name}
                                            value={form[f.name]}
                                            onChange={handleChange}
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
                                            placeholder={f.label}
                                            required={f.required}
                                        ></textarea>
                                    ) : (
                                        <input
                                            type="text"
                                            name={f.name}
                                            value={form[f.name]}
                                            onChange={handleChange}
                                            className="input input-bordered w-full"
                                            placeholder={f.label}
                                            required={f.required}
                                        />
                                    )}
                                    {errors[f.name] && <p className="mt-1 text-sm text-error">{errors[f.name]}</p>}
                                </div>
                            ))}

                            {errors.jenis && <p className="text-sm text-error">{errors.jenis}</p>}

                            <div className="flex flex-col-reverse gap-3 pt-4 border-t border-gray-100 md:flex-row md:justify-end">
                                <Link href="/surat/dashboard" className="btn btn-ghost">Batal</Link>
                                <button type="submit" disabled={processing} className="btn btn-primary">
                                    {processing ? 'Mengirim...' : 'Ajukan Surat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
