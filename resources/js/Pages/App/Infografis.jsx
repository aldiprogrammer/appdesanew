import { Link } from '@inertiajs/react';
import { useState } from 'react';

const barColors = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-violet-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-rose-500',
];

const agamaIcons = {
    Islam: 'fa-mosque',
    Kristen: 'fa-church',
    Katolik: 'fa-cross',
    Hindu: 'fa-hamsa',
    Budha: 'fa-spa',
    Konghucu: 'fa-yin-yang',
};

const sections = [
    { id: 'penduduk', label: 'Penduduk', icon: 'fa-users' },
    { id: 'agama', label: 'Agama', icon: 'fa-place-of-worship' },
    { id: 'pekerjaan', label: 'Pekerjaan', icon: 'fa-briefcase' },
    { id: 'kawin', label: 'Perkawinan', icon: 'fa-ring' },
    { id: 'stanting', label: 'Stanting', icon: 'fa-child' },
    { id: 'bansos', label: 'Bansos', icon: 'fa-hand-holding-heart' },
];

const cardGradients = [
    { from: 'from-emerald-400', to: 'to-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600' },
    { from: 'from-blue-400', to: 'to-blue-600', light: 'bg-blue-50', text: 'text-blue-600' },
    { from: 'from-pink-400', to: 'to-pink-600', light: 'bg-pink-50', text: 'text-pink-600' },
    { from: 'from-teal-400', to: 'to-teal-600', light: 'bg-teal-50', text: 'text-teal-600' },
];

export default function Infografis({ total, lakiLaki, perempuan, kepalaKeluarga, agama, pekerjaan, statusKawin, totalStanting, stantingPerDusun, totalBansos, bansosPerKategori }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const items = [
        {
            label: 'Total Penduduk',
            value: total.toLocaleString(),
            icon: 'fa-users',
            gradient: cardGradients[0],
        },
        {
            label: 'Laki-laki',
            value: lakiLaki.toLocaleString(),
            icon: 'fa-mars',
            gradient: cardGradients[1],
        },
        {
            label: 'Perempuan',
            value: perempuan.toLocaleString(),
            icon: 'fa-venus',
            gradient: cardGradients[2],
        },
        {
            label: 'Kepala Keluarga',
            value: kepalaKeluarga.toLocaleString(),
            icon: 'fa-house-chimney-user',
            gradient: cardGradients[3],
        },
    ];

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-chart-pie"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">Infografis <span className="font-normal text-gray-500">Tanjung Putus</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
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
                            <Link href="/infografis" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-chart-pie mr-2"></i>Infografis</Link>
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
                                <i className="fas fa-chart-simple"></i>
                                Data & Statistik
                            </div>
                            <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                                Infografis Desa
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                                Statistik kependudukan, stanting, dan bantuan sosial Desa Tanjung Putus — data terkini yang transparan untuk masyarakat.
                            </p>
                        </div>
                        <div className="mt-6 flex shrink-0 items-center gap-4 rounded-2xl bg-white/15 p-5 backdrop-blur-sm md:mt-0">
                            <div className="text-center">
                                <p className="text-xs font-medium text-white/70">Total Penduduk</p>
                                <p className="text-2xl font-extrabold text-white md:text-3xl">{total.toLocaleString()}</p>
                            </div>
                            <div className="h-12 w-px bg-white/20"></div>
                            <div className="text-center">
                                <p className="text-xs font-medium text-white/70">Kepala Keluarga</p>
                                <p className="text-2xl font-extrabold text-white md:text-3xl">{kepalaKeluarga.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="mx-auto max-w-6xl px-6 py-10">
                {/* Navigasi Section — scroll horizontal di mobile */}
                <div className="mb-8 overflow-x-auto pb-2 md:mb-12 md:flex md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
                    <div className="flex gap-2 md:flex-wrap md:justify-center">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition active:scale-95 hover:border-emerald-400 hover:text-emerald-600 md:px-5 md:py-2.5"
                            >
                                <i className={`fas ${s.icon} text-xs md:text-sm`}></i>
                                <span className="text-xs md:text-sm">{s.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Stat cards — 2 kolom di mobile */}
                <div id="penduduk" className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                    {items.map((item) => (
                        <div
                            key={item.label}
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:p-6"
                        >
                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                            <div className="mb-3 flex items-center justify-between md:mb-4">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient.from} ${item.gradient.to} text-white shadow-sm md:h-12 md:w-12 md:rounded-xl`}>
                                    <i className={`fas ${item.icon} text-sm md:text-base`}></i>
                                </div>
                                <span className={`rounded-full ${item.gradient.light} px-2 py-0.5 text-[10px] font-medium ${item.gradient.text} md:px-3 md:py-1 md:text-xs`}>
                                    {item.label}
                                </span>
                            </div>
                            <p className="text-xl font-extrabold text-gray-900 md:text-3xl">
                                {item.value}
                            </p>
                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100 md:mt-3 md:h-1.5">
                                <div className={`h-full rounded-full bg-gradient-to-r ${item.gradient.from} ${item.gradient.to} transition-all`} style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Perbandingan Jenis Kelamin + Ringkasan */}
                <div className="mt-8 grid gap-4 md:mt-10 md:gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-800 md:mb-6 md:text-lg">
                            <i className="fas fa-venus-mars mr-2 text-blue-500"></i>
                            Perbandingan Jenis Kelamin
                        </h3>
                        <div className="space-y-4 md:space-y-5">
                            <div>
                                <div className="mb-2 flex justify-between text-sm font-medium">
                                    <span className="text-blue-600">Laki-laki</span>
                                    <span>{lakiLaki.toLocaleString()}</span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 md:h-4">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                                        style={{ width: `${total ? (lakiLaki / total) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex justify-between text-sm font-medium">
                                    <span className="text-pink-600">Perempuan</span>
                                    <span>{perempuan.toLocaleString()}</span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 md:h-4">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all"
                                        style={{ width: `${total ? (perempuan / total) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-800 md:mb-6 md:text-lg">
                            <i className="fas fa-chart-simple mr-2 text-emerald-500"></i>
                            Ringkasan Data
                        </h3>
                        <div className="space-y-3 text-sm md:space-y-4">
                            {[
                                ['Total Penduduk', total.toLocaleString()],
                                ['Laki-laki', lakiLaki.toLocaleString()],
                                ['Perempuan', perempuan.toLocaleString()],
                                ['Kepala Keluarga', kepalaKeluarga.toLocaleString()],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0 md:pb-3"
                                >
                                    <span className="text-gray-600">{label}</span>
                                    <span className="font-semibold text-gray-900">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Agama — 2 kolom mobile */}
                <div id="agama" className="mt-12 md:mt-16">
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                            <i className="fas fa-place-of-worship mr-2 text-emerald-500"></i>
                            Agama
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Distribusi penduduk berdasarkan agama</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
                        {agama.map((item, i) => (
                            <div key={item.label} className={`rounded-2xl border border-gray-100 p-4 shadow-sm text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-6 ${i === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-white'}`}>
                                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm md:h-14 md:w-14 md:rounded-xl">
                                    <i className={`fas ${agamaIcons[item.label] || 'fa-place-of-worship'} text-sm md:text-xl`}></i>
                                </div>
                                <p className="text-xl font-extrabold text-gray-900 md:text-3xl">{item.total.toLocaleString()}</p>
                                <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pekerjaan */}
                <div id="pekerjaan" className="mt-12 md:mt-16">
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                            <i className="fas fa-briefcase mr-2 text-violet-500"></i>
                            Pekerjaan
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Distribusi penduduk berdasarkan pekerjaan</p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                        <div className="grid gap-4 md:gap-5 sm:grid-cols-2">
                            {pekerjaan.filter((_, i) => i < 16).map((item, i) => (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between text-sm font-medium">
                                        <span className="truncate text-xs md:text-sm">
                                            <i className="fas fa-user-check mr-1.5 text-gray-400 md:mr-2"></i>
                                            {item.label}
                                        </span>
                                        <span className="text-gray-600 shrink-0 ml-2 text-xs md:text-sm">{item.total.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 md:h-4">
                                        <div
                                            className={`h-full rounded-full ${barColors[i % barColors.length]} transition-all`}
                                            style={{ width: `${total ? (item.total / total) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Kawin — 2 kolom mobile */}
                <div id="kawin" className="mt-12 md:mt-16">
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                            <i className="fas fa-ring mr-2 text-pink-500"></i>
                            Status Perkawinan
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Distribusi penduduk berdasarkan status perkawinan</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                        {statusKawin.map((item, i) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-center transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:p-6"
                            >
                                <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm bg-gradient-to-br md:h-14 md:w-14 md:rounded-xl ${['from-emerald-400', 'from-blue-400', 'from-amber-400', 'from-rose-400'][i] || 'from-gray-400'
                                    } ${['to-emerald-600', 'to-blue-600', 'to-amber-600', 'to-rose-600'][i] || 'to-gray-600'
                                    }`}>
                                    <i className={`fas text-sm md:text-xl ${['fa-user', 'fa-user-check', 'fa-user-slash', 'fa-user-xmark'][i] || 'fa-user'}`}></i>
                                </div>
                                <p className="text-xl font-extrabold text-gray-900 md:text-3xl">{item.total.toLocaleString()}</p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 md:text-sm">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stanting — 2 kolom mobile */}
                <div id="stanting" className="mt-12 md:mt-16">
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                            <i className="fas fa-child mr-2 text-orange-500"></i>
                            Stanting
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Data anak stanting berdasarkan dusun</p>
                    </div>
                    {totalStanting > 0 ? (
                        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-400 to-orange-600 p-4 shadow-sm text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white shadow-sm backdrop-blur-sm md:h-14 md:w-14 md:rounded-xl">
                                    <i className="fas fa-child text-base md:text-2xl"></i>
                                </div>
                                <p className="text-xl font-extrabold text-white md:text-3xl">{totalStanting.toLocaleString()}</p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/80 md:text-sm">Total Stanting</p>
                            </div>
                            {stantingPerDusun.map((item) => (
                                <div key={item.nama_dusun} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-center transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500 md:h-12 md:w-12 md:rounded-xl">
                                        <i className="fas fa-location-dot text-sm md:text-base"></i>
                                    </div>
                                    <p className="text-xl font-extrabold text-gray-900 md:text-3xl">{item.total.toLocaleString()}</p>
                                    <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">{item.nama_dusun}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                                <i className="fas fa-child"></i>
                            </div>
                            <p className="text-xl font-semibold text-gray-500">Data Infografis Stanting tidak ada</p>
                        </div>
                    )}
                </div>

                {/* Bansos — 2 kolom mobile */}
                <div id="bansos" className="mt-12 md:mt-16">
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                            <i className="fas fa-hand-holding-heart mr-2 text-red-500"></i>
                            Bantuan Sosial
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Data penerima bantuan sosial berdasarkan kategori</p>
                    </div>
                    {totalBansos > 0 ? (
                        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-rose-400 to-rose-600 p-4 shadow-sm text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white shadow-sm backdrop-blur-sm md:h-14 md:w-14 md:rounded-xl">
                                    <i className="fas fa-hand-holding-heart text-base md:text-2xl"></i>
                                </div>
                                <p className="text-xl font-extrabold text-white md:text-3xl">{totalBansos.toLocaleString()}</p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/80 md:text-sm">Total Penerima</p>
                            </div>
                            {bansosPerKategori.map((item) => (
                                <div key={item.nama_bantuan} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-center transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500 md:h-12 md:w-12 md:rounded-xl">
                                        <i className="fas fa-gift text-sm md:text-base"></i>
                                    </div>
                                    <p className="text-xl font-extrabold text-gray-900 md:text-3xl">{item.total.toLocaleString()}</p>
                                    <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">{item.nama_bantuan}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                                <i className="fas fa-hand-holding-heart"></i>
                            </div>
                            <p className="text-xl font-semibold text-gray-500">Data Infografis Bansos tidak ada</p>
                        </div>
                    )}
                </div>

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
                    &copy; {new Date().getFullYear()} Desa Tanjung Putus. Data statistik transparan untuk masyarakat.
                </div>
            </footer>
        </div>
    );
}
