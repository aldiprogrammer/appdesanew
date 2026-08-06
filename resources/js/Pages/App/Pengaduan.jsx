import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const statusBadge = {
    pending: 'badge-warning',
    diproses: 'badge-info',
    selesai: 'badge-success',
    ditolak: 'badge-error',
};

const statusLabel = {
    pending: 'Pending',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

export default function Pengaduan() {
    const { flash = {}, errors: serverErrors = {}, pengaduan, nik: cekNik } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [nik, setNik] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [gambar, setGambar] = useState(null);
    const [gambarPreview, setGambarPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [cekNikValue, setCekNikValue] = useState('');
    const [hasilCek, setHasilCek] = useState(null);
    const fileRef = useRef(null);

    useEffect(() => {
        if (flash.success) {
            Swal.fire({ title: 'Berhasil', text: flash.success, icon: 'success', timer: 1800, showConfirmButton: false });
            setNik('');
            setKeterangan('');
            setGambar(null);
            setGambarPreview(null);
            if (fileRef.current) fileRef.current.value = '';
        }
        if (flash.error) {
            Swal.fire({ title: 'Gagal', text: flash.error, icon: 'error', buttonsStyling: false, customClass: { confirmButton: 'btn btn-error text-white' } });
        }
        if (pengaduan) {
            setHasilCek(pengaduan);
        }
    }, [flash]);

    useEffect(() => {
        if (Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
        }
    }, [serverErrors]);

    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                setErrors((prev) => ({ ...prev, gambar: 'Ukuran file maksimal 4MB' }));
                return;
            }
            setGambar(file);
            setGambarPreview(URL.createObjectURL(file));
            setErrors((prev) => {
                const { gambar, ...rest } = prev;
                return rest;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('nik', nik);
        formData.append('keterangan', keterangan);
        if (gambar) {
            formData.append('gambar', gambar);
        }

        router.post('/pengaduan', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onError: (err) => setErrors(err),
        });
    };

    const handleCekStatus = (e) => {
        e.preventDefault();
        router.post('/pengaduan/cek-status', { nik: cekNikValue }, {
            preserveScroll: true,
            onError: (err) => setErrors(err),
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-bullhorn"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">Pengaduan <span className="font-normal text-gray-500">Masyarakat</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
                        <Link href="/umkm" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-store mr-1.5"></i>UMKM</Link>
                        <Link href="/pengaduan" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-bullhorn mr-1.5"></i>Pengaduan</Link>
                        <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-1.5"></i>Kontak</Link>
                        <Link href="/struktur" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-sitemap mr-1.5"></i>Struktur</Link>
                        <Link href="/surat/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-file-lines mr-1.5"></i>Surat</Link>
                    </div>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 md:hidden">
                        <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
                    </button>
                </div>
                {menuOpen && (
                    <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
                        <div className="flex flex-col gap-2">
                            <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-2"></i>Beranda</Link>
                            <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-2"></i>Profil</Link>
                            <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-2"></i>Infografis</Link>
                            <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-2"></i>APBDes</Link>
                            <Link href="/umkm" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-store mr-2"></i>UMKM</Link>
                            <Link href="/pengaduan" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-bullhorn mr-2"></i>Pengaduan</Link>
                            <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="/struktur" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
                            <Link href="/surat/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-file-lines mr-2"></i>Surat</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Jumbotron */}
            <div className="relative mt-14 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white"></div>
                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white"></div>
                </div>
                <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                                <i className="fas fa-bullhorn"></i>
                                Sampaikan Aspirasi & Laporan
                            </div>
                            <h1 className="text-3xl font-extrabold text-white md:text-5xl">Pengaduan Masyarakat</h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                                Laporkan masalah, sampaikan aspirasi, atau berikan masukan untuk pembangunan desa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Form Pengaduan */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                <i className="fas fa-pen"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Buat Pengaduan</h2>
                                <p className="text-xs text-gray-500">Isi data dengan lengkap dan benar.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    NIK <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={nik}
                                    onChange={(e) => setNik(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Masukkan 16 digit NIK"
                                    maxLength={16}
                                    required
                                />
                                {errors.nik && <p className="mt-1 text-sm text-error">{errors.nik}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Keterangan <span className="text-error">*</span>
                                </label>
                                <textarea
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Jelaskan pengaduan Anda secara detail (min. 10 karakter)"
                                    rows={5}
                                    required
                                ></textarea>
                                {errors.keterangan && <p className="mt-1 text-sm text-error">{errors.keterangan}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Upload Gambar <span className="text-gray-400">(opsional, maks. 4MB)</span>
                                </label>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/jpg,image/jpeg,image/png,image/webp"
                                    onChange={handleGambarChange}
                                    className="file-input file-input-bordered w-full"
                                />
                                {gambarPreview && (
                                    <div className="mt-3">
                                        <img src={gambarPreview} alt="Preview" className="h-40 w-full rounded-lg border border-gray-200 object-cover" />
                                    </div>
                                )}
                                {errors.gambar && <p className="mt-1 text-sm text-error">{errors.gambar}</p>}
                            </div>

                            <button type="submit" disabled={processing} className="btn btn-primary w-full">
                                {processing ? 'Mengirim...' : 'Kirim Pengaduan'}
                            </button>
                        </form>
                    </div>

                    {/* Cek Status Pengaduan */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <i className="fas fa-search"></i>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Cek Status</h2>
                                    <p className="text-xs text-gray-500">Masukkan NIK untuk melihat status pengaduan.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCekStatus} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        value={cekNikValue}
                                        onChange={(e) => setCekNikValue(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Masukkan NIK"
                                        maxLength={16}
                                        required
                                    />
                                    {errors.nik && <p className="mt-1 text-sm text-error">{errors.nik}</p>}
                                </div>
                                <button type="submit" className="btn btn-outline btn-primary w-full">
                                    <i className="fas fa-search mr-2"></i>Cari
                                </button>
                            </form>
                        </div>

                        {/* Hasil Cek */}
                        {hasilCek && hasilCek.length > 0 && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                                <h3 className="text-sm font-bold text-gray-900 mb-4">
                                    Pengaduan NIK: {cekNik}
                                </h3>
                                <div className="space-y-3">
                                    {hasilCek.map((item) => (
                                        <div key={item.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.keterangan}</p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <span className={`badge shrink-0 ${statusBadge[item.status] || 'badge-ghost'}`}>
                                                    {statusLabel[item.status] || item.status}
                                                </span>
                                            </div>
                                            {item.foto && (
                                                <a href={item.foto} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                                    <i className="fas fa-image"></i>Lihat Gambar
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {hasilCek && hasilCek.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl text-gray-400">
                                    <i className="fas fa-circle-info"></i>
                                </div>
                                <p className="text-sm font-semibold text-gray-500">Belum ada pengaduan</p>
                                <p className="text-xs text-gray-400 mt-1">NIK ini belum memiliki pengaduan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-6">
                    <p className="text-center text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Pemerintah Desa Tanjung Putus &mdash; Layanan Pengaduan Masyarakat
                    </p>
                </div>
            </div>
        </div>
    );
}
