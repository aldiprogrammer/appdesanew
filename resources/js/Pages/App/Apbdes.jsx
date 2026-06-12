import { Link } from '@inertiajs/react';
import { useState } from 'react';

const rupiah = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');

const kategoriIcon = {
    Pembangunan: 'fa-hard-hat',
    Operasional: 'fa-gears',
    Pemberdayaan: 'fa-people-group',
    Sosial: 'fa-hand-holding-hand',
    Lainnya: 'fa-ellipsis-h',
};

const kategoriColor = {
    Pembangunan: 'bg-blue-500',
    Operasional: 'bg-amber-500',
    Pemberdayaan: 'bg-emerald-500',
    Sosial: 'bg-rose-500',
    Lainnya: 'bg-gray-500',
};

export default function Apbdes({ anggaran }) {
    const latest = anggaran.length > 0 ? anggaran[0] : null;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-landmark"></i>
                        </div>
                        <span className="text-lg font-bold text-gray-800">APBDes <span className="font-normal text-gray-500">Tanjung Putus</span></span>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="/profildesa" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600"><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/apbdes" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
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
                            <Link href="/apbdes" className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600"><i className="fas fa-landmark mr-2"></i>APBDes</Link>
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
                                <i className="fas fa-calculator"></i>
                                Keuangan Desa
                            </div>
                            <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                                APBDes
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                                Anggaran Pendapatan dan Belanja Desa Tanjung Putus — transparan, akuntabel, dan terbuka untuk masyarakat.
                            </p>
                        </div>
                        {latest && (
                            <div className="mt-6 flex shrink-0 items-center gap-4 rounded-2xl bg-white/15 p-4 backdrop-blur-sm md:mt-0 md:p-5">
                                <div className="text-center">
                                    <p className="text-xs font-medium text-white/70">Tahun</p>
                                    <p className="text-2xl font-extrabold text-white md:text-3xl">{latest.tahun}</p>
                                </div>
                                <div className="h-10 w-px bg-white/20 md:h-12"></div>
                                <div className="text-center">
                                    <p className="text-xs font-medium text-white/70">Status</p>
                                    <span className={`badge mt-1 border-0 text-[10px] font-semibold md:text-xs ${
                                        latest.status === 'realisasi' ? 'badge-success' :
                                        latest.status === 'disetujui' ? 'badge-info' :
                                        latest.status === 'ditolak' ? 'badge-error' : 'badge-ghost'
                                    }`}>{latest.status}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="mx-auto max-w-6xl px-6 py-10">
                {!latest ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                            <i className="fas fa-file-invoice"></i>
                        </div>
                        <p className="text-xl font-semibold text-gray-500">Belum ada data APBDes</p>
                    </div>
                ) : (
                    <>
                        {/* Tahun navigasi — scroll horizontal di mobile */}
                        {anggaran.length > 1 && (
                            <div className="mb-8 overflow-x-auto pb-2 md:mb-10 md:flex md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
                                <div className="flex gap-2 md:flex-wrap md:justify-center">
                                    {anggaran.map((a) => (
                                        <a
                                            key={a.id}
                                            href={`#tahun-${a.tahun}`}
                                            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition active:scale-95 ${
                                                a.id === latest.id
                                                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-emerald-200'
                                                    : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-400 hover:text-emerald-600'
                                            }`}
                                        >
                                            <i className="fas fa-calendar text-xs"></i>
                                            {a.tahun}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {anggaran.map((a) => {
                            const sisa = Number(a.total_pendapatan) - Number(a.total_belanja);
                            const pendapatanTotal = a.pendapatans.reduce((sum, p) => sum + Number(p.jumlah), 0);
                            const belanjaTotal = a.belanjas.reduce((sum, b) => sum + Number(b.jumlah), 0);
                            const pendapatanPersen = pendapatanTotal > 0 ? a.pendapatans.map(p => (Number(p.jumlah) / pendapatanTotal) * 100) : [];
                            const belanjaPersen = belanjaTotal > 0 ? a.belanjas.map(b => (Number(b.jumlah) / belanjaTotal) * 100) : [];

                            return (
                                <div key={a.id} id={`tahun-${a.tahun}`} className="mb-12 last:mb-0 md:mb-16">
                                    {/* Summary Cards — 2 kolom mobile, 3 desktop */}
                                    <div className="mb-8 grid grid-cols-2 gap-3 md:mb-10 md:gap-5 lg:grid-cols-3">
                                        <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                                            <div className="mb-3 flex items-center justify-between md:mb-4">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm md:h-12 md:w-12 md:rounded-xl">
                                                    <i className="fas fa-arrow-down text-sm md:text-base"></i>
                                                </div>
                                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 md:px-3 md:py-1 md:text-xs">Pendapatan</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-gray-500 md:text-sm">Total Pendapatan</p>
                                            <p className="mt-1 text-base font-extrabold text-gray-900 md:mt-1 md:text-2xl">{rupiah(a.total_pendapatan)}</p>
                                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100 md:mt-3 md:h-1.5">
                                                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:p-6">
                                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                                            <div className="mb-3 flex items-center justify-between md:mb-4">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-sm md:h-12 md:w-12 md:rounded-xl">
                                                    <i className="fas fa-arrow-up text-sm md:text-base"></i>
                                                </div>
                                                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-600 md:px-3 md:py-1 md:text-xs">Belanja</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-gray-500 md:text-sm">Total Belanja</p>
                                            <p className="mt-1 text-base font-extrabold text-gray-900 md:mt-1 md:text-2xl">{rupiah(a.total_belanja)}</p>
                                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100 md:mt-3 md:h-1.5">
                                                <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500" style={{ width: `${a.total_belanja > 0 && a.total_pendapatan > 0 ? Math.min((a.total_belanja / a.total_pendapatan) * 100, 100) : 0}%` }}></div>
                                            </div>
                                        </div>

                                        {/* Card Sisa — full width di mobile (col-span-2), normal di desktop */}
                                        <div className="group relative col-span-2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 active:scale-[0.97] hover:-translate-y-1.5 hover:shadow-xl md:col-span-1 md:p-6">
                                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
                                            <div className="mb-3 flex items-center justify-between md:mb-4">
                                                <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm md:h-12 md:w-12 md:rounded-xl ${
                                                    sisa >= 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-red-400 to-red-600'
                                                }`}>
                                                    <i className="fas fa-coins text-sm md:text-base"></i>
                                                </div>
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium md:px-3 md:py-1 md:text-xs ${
                                                    sisa >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                                }`}>Sisa</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-gray-500 md:text-sm">Sisa Anggaran</p>
                                            <p className={`mt-1 text-base font-extrabold md:mt-1 md:text-2xl ${sisa >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                                {sisa >= 0 ? '' : '-'}{rupiah(Math.abs(sisa))}
                                            </p>
                                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100 md:mt-3 md:h-1.5">
                                                <div className={`h-full rounded-full ${
                                                    sisa >= 0 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                                                }`} style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pendapatan & Belanja */}
                                    <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                                        {/* Pendapatan */}
                                        <div>
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 md:h-10 md:w-10 md:rounded-xl">
                                                    <i className="fas fa-circle-dollar text-sm md:text-base"></i>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900 md:text-lg">Pendapatan</h3>
                                                    <p className="text-[11px] text-gray-500 md:text-xs">Sumber pemasukan desa</p>
                                                </div>
                                            </div>
                                            <div className="rounded-xl border border-gray-100 bg-white shadow-sm md:rounded-2xl">
                                                {a.pendapatans.length > 0 ? (
                                                    <div className="divide-y divide-gray-50">
                                                        {a.pendapatans.map((p, i) => {
                                                            const pct = pendapatanPersen[i] || 0;
                                                            return (
                                                                <div key={p.id} className="p-3 transition hover:bg-emerald-50/50 md:p-4">
                                                                    <div className="flex items-center justify-between gap-3">
                                                                        <div className="flex items-center gap-2 min-w-0 md:gap-3">
                                                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 md:h-7 md:w-7 md:text-xs">{i + 1}</span>
                                                                            <div className="min-w-0">
                                                                                <p className="text-xs font-semibold text-gray-900 truncate md:text-sm">{p.sumber_pendapatan}</p>
                                                                                {p.keterangan && <p className="text-[10px] text-gray-400 truncate md:text-xs">{p.keterangan}</p>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right shrink-0">
                                                                            <p className="text-xs font-bold text-emerald-600 md:text-sm">{rupiah(p.jumlah)}</p>
                                                                            <p className="text-[10px] text-gray-400 md:text-xs">{pct.toFixed(1)}%</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100 md:h-1.5">
                                                                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: `${pct}%` }}></div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="p-6 text-center text-gray-400 text-sm md:p-8">Belum ada data pendapatan</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Belanja */}
                                        <div>
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 md:h-10 md:w-10 md:rounded-xl">
                                                    <i className="fas fa-receipt text-sm md:text-base"></i>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900 md:text-lg">Belanja Desa</h3>
                                                    <p className="text-[11px] text-gray-500 md:text-xs">Penggunaan anggaran desa</p>
                                                </div>
                                            </div>
                                            <div className="rounded-xl border border-gray-100 bg-white shadow-sm md:rounded-2xl">
                                                {a.belanjas.length > 0 ? (
                                                    <div className="divide-y divide-gray-50">
                                                        {a.belanjas.map((b, i) => {
                                                            const pct = belanjaPersen[i] || 0;
                                                            return (
                                                                <div key={b.id} className="p-3 transition hover:bg-rose-50/50 md:p-4">
                                                                    <div className="flex items-start justify-between gap-3">
                                                                        <div className="flex items-start gap-2 min-w-0 md:gap-3">
                                                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-700 mt-0.5 md:h-7 md:w-7 md:text-xs">{i + 1}</span>
                                                                            <div className="min-w-0">
                                                                                <p className="text-xs font-semibold text-gray-900 md:text-sm">{b.kegiatan}</p>
                                                                                <div className="mt-1 flex flex-wrap items-center gap-1">
                                                                                    {b.kategori && (
                                                                                        <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium text-white md:px-2 md:py-0.5 md:text-xs ${kategoriColor[b.kategori] || 'bg-gray-500'}`}>
                                                                                            <i className={`fas ${kategoriIcon[b.kategori] || 'fa-tag'} text-[8px] md:text-[10px]`}></i>
                                                                                            {b.kategori}
                                                                                        </span>
                                                                                    )}
                                                                                    {b.lokasi && (
                                                                                        <span className="text-[9px] text-gray-400 md:text-xs"><i className="fas fa-location-dot mr-0.5"></i>{b.lokasi}</span>
                                                                                    )}
                                                                                </div>
                                                                                {b.keterangan && <p className="mt-1 text-[10px] text-gray-400 md:text-xs">{b.keterangan}</p>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right shrink-0">
                                                                            <p className="text-xs font-bold text-rose-600 md:text-sm">{rupiah(b.jumlah)}</p>
                                                                            <p className="text-[10px] text-gray-400 md:text-xs">{pct.toFixed(1)}%</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100 md:h-1.5">
                                                                        <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500" style={{ width: `${pct}%` }}></div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="p-6 text-center text-gray-400 text-sm md:p-8">Belum ada data belanja</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}

                {/* Navigasi */}
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link href="/infografis" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600 md:px-6 md:py-3">
                        <i className="fas fa-chart-pie"></i>
                        Lihat Infografis
                    </Link>
                    <Link href="/desa" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-emerald-700 md:px-6 md:py-3">
                        <i className="fas fa-arrow-left"></i>
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Desa Tanjung Putus. APBDes transparan untuk masyarakat.
                </div>
            </footer>
        </div>
    );
}
