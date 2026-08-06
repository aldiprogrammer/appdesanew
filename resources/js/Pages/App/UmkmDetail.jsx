import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function UmkmDetail({ umkm }) {
    const [menuOpen, setMenuOpen] = useState(false);

    if (!umkm) {
        return (
            <div className="min-h-screen bg-[#f5f7fa]">
                <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                        <Link href="/desa" className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                                <i className="fas fa-store"></i>
                            </div>
                            <span className="text-lg font-bold text-gray-800">UMKM</span>
                        </Link>
                    </div>
                </nav>
                <div className="mx-auto max-w-6xl px-6 py-24 text-center">
                    <p className="text-xl text-gray-500">UMKM tidak ditemukan.</p>
                    <Link href="/umkm" className="mt-4 inline-block text-emerald-600 font-semibold">← Kembali</Link>
                </div>
            </div>
        );
    }

    const images = [umkm.foto1, umkm.foto2, umkm.foto3].filter(Boolean);

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-store"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">UMKM <span className="font-normal text-gray-500">Tanjung Putus</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
                        <Link href="/umkm" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-store mr-1.5"></i>UMKM</Link>
                        <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-1.5"></i>Pengaduan</Link>
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
                            <Link href="/umkm" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-store mr-2"></i>UMKM</Link>
                            <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-2"></i>Pengaduan</Link>
                            <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="/struktur" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
                            <Link href="/surat/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-file-lines mr-2"></i>Surat</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Detail */}
            <div className="mx-auto max-w-4xl px-6 pt-28 pb-16">
                <div className="mb-6">
                    <Link href="/umkm" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                        <i className="fas fa-arrow-left"></i>
                        Kembali ke Daftar UMKM
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    {images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                            {images.map((img, i) => (
                                <div key={i} className="overflow-hidden rounded-lg">
                                    {img ? (
                                        <img src={img} alt={`${umkm.nama_usaha} - foto ${i + 1}`} className="h-48 w-full object-cover" />
                                    ) : (
                                        <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                                            <i className="fas fa-store text-4xl text-gray-300"></i>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="p-6 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                <i className="fas fa-store mr-1"></i> UMKM
                            </span>
                        </div>

                        <h1 className="text-2xl font-extrabold text-gray-900 md:text-4xl">{umkm.nama_usaha}</h1>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Alamat</p>
                                    <p className="text-base text-gray-900">{umkm.alamat}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Kontak</p>
                                    <a href={`tel:${umkm.nohp}`} className="text-base font-semibold text-emerald-600 hover:text-emerald-700">{umkm.nohp}</a>
                                </div>
                            </div>
                        </div>

                        {umkm.keterangan && (
                            <div className="mt-8">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Keterangan</h2>
                                <p className="text-base leading-relaxed text-gray-700">{umkm.keterangan}</p>
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={`tel:${umkm.nohp}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-emerald-700">
                                <i className="fas fa-phone-alt"></i>
                                Hubungi Pemilik
                            </a>
                            <Link href="/umkm" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600">
                                <i className="fas fa-arrow-left"></i>
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Desa Tanjung Putus. Dukung UMKM lokal desa kita.
                </div>
            </footer>
        </div>
    );
}
