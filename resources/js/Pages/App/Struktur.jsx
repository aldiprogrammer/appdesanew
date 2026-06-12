import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Struktur({ pegawai }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar kompak — same as APBDes */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-sitemap"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">Struktur <span className="font-normal text-gray-500">Organisasi</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/apbdes" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
                        <Link href="/pengaduan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-bullhorn mr-1.5"></i>Pengaduan</Link>
                        <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-1.5"></i>Kontak</Link>
                        <Link href="/struktur" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-sitemap mr-1.5"></i>Struktur</Link>
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
                            <Link href="/kontak-layanan" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="/struktur" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
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
                                <i className="fas fa-sitemap"></i>
                                Organisasi Desa
                            </div>
                            <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                                Struktur Organisasi
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                                Struktur tata kelola pemerintahan Desa Tanjung Putus yang profesional dan transparan.
                            </p>
                        </div>
                        <div className="mt-6 flex shrink-0 items-center gap-4 rounded-2xl bg-white/15 p-5 backdrop-blur-sm md:mt-0">
                            <div className="text-center">
                                <p className="text-3xl font-extrabold text-white">{pegawai.length}</p>
                                <p className="text-xs font-medium text-white/70">Total Perangkat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="mx-auto max-w-6xl px-6 py-10">
                {pegawai.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                            <i className="fas fa-users-slash"></i>
                        </div>
                        <p className="text-xl font-semibold text-gray-500">Belum ada data pegawai</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {pegawai.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                            >
                                {/* Gradient header strip */}
                                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>

                                {/* Photo */}
                                <div className="flex justify-center pt-8 pb-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-sm opacity-40 group-hover:opacity-60 transition"></div>
                                        {item.foto ? (
                                            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-lg">
                                                <img src={item.foto} alt={item.nama} className="h-full w-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 ring-4 ring-white shadow-lg">
                                                <span className="text-2xl font-bold text-white tracking-wide">
                                                    {item.nama.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        {/* Badge jabatan */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
                                                item.jb?.jabatan?.toLowerCase().includes('kepala') ? 'bg-emerald-100 text-emerald-700' :
                                                item.jb?.jabatan?.toLowerCase().includes('sekretaris') ? 'bg-blue-100 text-blue-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                                <i className={`fas ${
                                                    item.jb?.jabatan?.toLowerCase().includes('kepala') ? 'fa-crown' :
                                                    item.jb?.jabatan?.toLowerCase().includes('sekretaris') ? 'fa-file-pen' :
                                                    'fa-user-gear'
                                                }`}></i>
                                                {item.jb?.jabatan?.toLowerCase().includes('kepala') ? 'Pimpinan' :
                                                 item.jb?.jabatan?.toLowerCase().includes('sekretaris') ? 'Sekretaris' :
                                                 'Perangkat'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="px-5 pb-6 pt-4 text-center">
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                        {item.nama}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-gray-500">
                                        {item.jb?.jabatan || '-'}
                                    </p>
                                    {item.nohp && (
                                        <a
                                            href={`tel:${item.nohp}`}
                                            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                                        >
                                            <i className="fas fa-phone-alt text-[10px]"></i>
                                            {item.nohp}
                                        </a>
                                    )}
                                </div>
                            </div>
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
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Desa Tanjung Putus. Struktur organisasi desa.
                </div>
            </footer>
        </div>
    );
}
