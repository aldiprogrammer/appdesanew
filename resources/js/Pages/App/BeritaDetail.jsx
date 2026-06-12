import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function BeritaDetail({ berita }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    if (!berita) {
        return (
            <div className="min-h-screen bg-[#f5f7fa]">
                <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                        <Link href="/desa" className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                                <i className="fas fa-newspaper"></i>
                            </div>
                            <span className="text-lg font-bold text-gray-800">Berita</span>
                        </Link>
                    </div>
                </nav>
                <div className="mx-auto max-w-6xl px-6 py-24 text-center">
                    <p className="text-xl text-gray-500">Berita tidak ditemukan.</p>
                    <Link href="/berita" className="mt-4 inline-block text-emerald-600 font-semibold">← Kembali</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-newspaper"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">Berita <span className="font-normal text-gray-500">Tanjung Putus</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/berita" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-newspaper mr-1.5"></i>Berita</Link>
                        <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
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
                            <Link href="/berita" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-newspaper mr-2"></i>Berita</Link>
                            <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-2"></i>APBDes</Link>
                            <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-2"></i>Pengaduan</Link>
                            <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="/struktur" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
                            <Link href="/surat/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-file-lines mr-2"></i>Surat</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Article */}
            <div className="mx-auto max-w-4xl px-6 pt-28 pb-16">
                <div className="mb-6">
                    <Link href="/berita" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                        <i className="fas fa-arrow-left"></i>
                        Kembali ke Daftar Berita
                    </Link>
                </div>

                <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    {berita.foto ? (
                        <div className="overflow-hidden">
                            <img src={berita.foto} alt={berita.judul} className="h-72 w-full object-cover md:h-96" />
                        </div>
                    ) : (
                        <div className="flex h-72 w-full items-center justify-center bg-gray-100 md:h-96">
                            <i className="fas fa-newspaper text-6xl text-gray-300"></i>
                        </div>
                    )}

                    <div className="p-6 md:p-10">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span><i className="far fa-calendar mr-1.5"></i>{formatDate(berita.created_at || berita.tanggal_posting)}</span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Berita Desa</span>
                        </div>

                        <h1 className="mt-4 text-2xl font-extrabold text-gray-900 md:text-4xl">{berita.judul}</h1>

                        <div className="mt-8 text-base leading-relaxed text-gray-700 md:text-lg" dangerouslySetInnerHTML={{ __html: berita.keterangan || '' }} />
                    </div>
                </article>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link href="/desa" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-emerald-700">
                        <i className="fas fa-arrow-left"></i>
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Desa Tanjung Putus. Informasi dan berita terkini untuk masyarakat.
                </div>
            </footer>
        </div>
    );
}
