import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function KontakLayanan({ kontak }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const iconColors = [
        'from-red-500 to-red-600',
        'from-orange-500 to-orange-600',
        'from-emerald-500 to-emerald-600',
        'from-blue-500 to-blue-600',
        'from-yellow-500 to-yellow-600',
        'from-cyan-500 to-cyan-600',
        'from-sky-500 to-sky-600',
        'from-violet-500 to-violet-600',
    ];

    const iconBg = [
        'bg-red-50',
        'bg-orange-50',
        'bg-emerald-50',
        'bg-blue-50',
        'bg-yellow-50',
        'bg-cyan-50',
        'bg-sky-50',
        'bg-violet-50',
    ];

    const ringColors = [
        'ring-red-200',
        'ring-orange-200',
        'ring-emerald-200',
        'ring-blue-200',
        'ring-yellow-200',
        'ring-cyan-200',
        'ring-sky-200',
        'ring-violet-200',
    ];

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-phone"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">Kontak <span className="font-normal text-gray-500">Layanan</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
                        <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-1.5"></i>Pengaduan</Link>
                        <Link href="/kontak-layanan" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-phone mr-1.5"></i>Kontak</Link>
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
                            <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-2"></i>Pengaduan</Link>
                            <Link href="/kontak-layanan" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="/struktur" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
                            <Link href="/surat/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-file-lines mr-2"></i>Surat</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Jumbotron kompak */}
            <div className="relative mt-14 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white"></div>
                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white"></div>
                </div>
                <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                                <i className="fas fa-phone"></i>
                                Layanan Darurat & Informasi
                            </div>
                            <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                                Kontak Layanan
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                                Nomor penting yang dapat dihubungi dalam keadaan darurat atau untuk memperoleh layanan masyarakat.
                            </p>
                        </div>
                        <div className="mt-6 flex shrink-0 items-center gap-4 rounded-2xl bg-white/15 p-5 backdrop-blur-sm md:mt-0">
                            <div className="text-center">
                                <p className="text-3xl font-extrabold text-white">{kontak.length}</p>
                                <p className="text-xs font-medium text-white/70">Total Layanan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="mx-auto max-w-6xl px-6 py-10">
                {kontak.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                            <i className="fas fa-phone-slash"></i>
                        </div>
                        <p className="text-xl font-semibold text-gray-500">Belum ada kontak layanan</p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {kontak.map((item, i) => (
                            <a
                                key={item.id}
                                href={`tel:${item.nomor}`}
                                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                            >
                                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                                <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg[i % iconBg.length]} ring-2 ${ringColors[i % ringColors.length]} transition group-hover:scale-110`}>
                                    {item.icon_image ? (
                                        <img src={item.icon_image} alt={item.nama_layanan} className="h-8 w-8 object-contain" />
                                    ) : item.icon_class ? (
                                        <i className={`${item.icon_class} text-2xl`}
                                            style={{
                                                color: ['#dc2626', '#ea580c', '#059669', '#2563eb', '#ca8a04', '#0891b2', '#0284c7', '#7c3aed'][i % 8]
                                            }}
                                        ></i>
                                    ) : (
                                        <i className="fas fa-phone text-2xl text-gray-400"></i>
                                    )}
                                </div>
                                <p className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                                    {item.nama_layanan}
                                </p>
                                <p className="mt-2 flex items-center gap-2 text-2xl font-extrabold tracking-tight"
                                    style={{
                                        color: ['#dc2626', '#ea580c', '#059669', '#2563eb', '#ca8a04', '#0891b2', '#0284c7', '#7c3aed'][i % 8]
                                    }}
                                >
                                    <i className="fas fa-phone-alt text-sm opacity-70"></i>
                                    {item.nomor}
                                </p>
                                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-emerald-500 transition">
                                    <i className="fas fa-arrow-up-right-from-square"></i>
                                    Ketuk untuk menelepon
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Navigasi */}
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link href="/apbdes" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600">
                        <i className="fas fa-landmark"></i>
                        Lihat APBDes
                    </Link>
                    <Link href="/desa" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-emerald-700">
                        <i className="fas fa-arrow-left"></i>
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Desa Tanjung Putus. Hubungi nomor darurat dengan bijak.
                </div>
            </footer>
        </div>
    );
}
