import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function BeritaList({ berita = [] }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    const featured = berita.length > 0 ? berita[0] : null;
    const rest = berita.length > 1 ? berita.slice(1) : [];

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
                        <Link href="/umkm" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-store mr-1.5"></i>UMKM</Link>
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
                            <Link href="/umkm" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-store mr-2"></i>UMKM</Link>
                            <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-2"></i>Pengaduan</Link>
                            <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="/struktur" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
                            <Link href="/surat/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-file-lines mr-2"></i>Surat</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <div className="relative mt-14 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white"></div>
                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white"></div>
                </div>
                <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                                <i className="fas fa-newspaper"></i>
                                Informasi Desa
                            </div>
                            <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                                Berita Desa
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                                Informasi terbaru seputar kegiatan, pembangunan, dan pelayanan Desa Tanjung Putus.
                            </p>
                        </div>
                        <div className="mt-6 flex shrink-0 items-center gap-4 rounded-2xl bg-white/15 p-5 backdrop-blur-sm md:mt-0">
                            <div className="text-center">
                                <p className="text-3xl font-extrabold text-white">{berita.length}</p>
                                <p className="text-xs font-medium text-white/70">Total Berita</p>
                            </div>
                            <div className="h-12 w-px bg-white/20"></div>
                            <div className="text-center">
                                <i className="fas fa-newspaper text-3xl text-white/60"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-10">
                {berita.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                            <i className="fas fa-newspaper"></i>
                        </div>
                        <p className="text-xl font-semibold text-gray-500">Belum ada berita</p>
                    </div>
                ) : (
                    <>
                        {/* Featured article — stacked vert on mobile, horizontal on desktop */}
                        {featured && (
                            <Link href={`/berita/${featured.id}`} className="group relative mb-8 block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:mb-10">
                                <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                                <div className="md:grid md:grid-cols-5">
                                    <div className="relative overflow-hidden md:col-span-3">
                                        {featured.foto ? (
                                            <img src={featured.foto} alt={featured.judul} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full" />
                                        ) : (
                                            <div className="flex h-52 w-full items-center justify-center bg-gray-100 md:h-full">
                                                <i className="fas fa-newspaper text-5xl text-gray-300"></i>
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">Terbaru</span>
                                    </div>
                                    <div className="flex flex-col justify-center p-5 md:col-span-2 md:p-8">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <i className="far fa-calendar"></i>
                                            <span>{formatDate(featured.created_at || featured.tanggal_posting)}</span>
                                        </div>
                                        <h2 className="mt-2 text-lg font-bold text-gray-900 transition group-hover:text-emerald-600 md:text-2xl">{featured.judul}</h2>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                                            {(featured.keterangan || '').replace(/<[^>]*>/g, '').slice(0, 200)}
                                        </p>
                                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:gap-3">
                                            Baca Selengkapnya <i className="fas fa-arrow-right text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Section label */}
                        {rest.length > 0 && (
                            <div className="mb-5 flex items-center gap-3">
                                <div className="h-px flex-1 bg-gray-200"></div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Berita Lainnya</span>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>
                        )}

                        {/* Grid cards — 2 kolom di mobile, 3 di desktop */}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
                                {rest.map((b) => (
                                    <Link key={b.id} href={`/berita/${b.id}`} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 active:scale-[0.98] hover:-translate-y-1.5 hover:shadow-xl">
                                        <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                                        <div className="relative overflow-hidden">
                                            {b.foto ? (
                                                <img src={b.foto} alt={b.judul} className="h-28 w-full object-cover transition duration-500 group-hover:scale-105 md:h-48" />
                                            ) : (
                                                <div className="flex h-28 w-full items-center justify-center bg-gray-100 md:h-48">
                                                    <i className="fas fa-newspaper text-2xl text-gray-300 md:text-4xl"></i>
                                                </div>
                                            )}
                                            <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-700 shadow-sm backdrop-blur-sm md:top-3 md:left-3 md:px-3 md:py-1 md:text-xs">
                                                <i className="far fa-calendar mr-0.5 md:mr-1"></i>{formatDate(b.created_at || b.tanggal_posting)}
                                            </span>
                                        </div>
                                        <div className="p-3 md:p-5">
                                            <h3 className="text-[13px] font-bold text-gray-900 transition group-hover:text-emerald-600 line-clamp-2 md:text-base">{b.judul}</h3>
                                            <p className="mt-1 hidden text-xs leading-relaxed text-gray-500 line-clamp-2 md:line-clamp-3 md:mt-2 md:text-sm md:block">
                                                {(b.keterangan || '').replace(/<[^>]*>/g, '').slice(0, 120)}
                                            </p>
                                            <div className="mt-2 flex items-center text-[11px] font-semibold text-emerald-600 md:mt-4 md:text-xs">
                                                Baca <i className="fas fa-arrow-right ml-1 text-[9px] md:ml-1.5 md:text-[10px]"></i>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Navigasi */}
                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <Link href="/desa" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-emerald-700">
                                <i className="fas fa-arrow-left"></i>
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </>
                )}
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
