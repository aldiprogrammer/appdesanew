import Navbar from './Navbar';
import { Link } from '@inertiajs/react';

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

    return (
        <>
            <Navbar />

            <section className="bg-[#f7f7f7] py-24 text-gray-950">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-14 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5f7eb] text-3xl text-[#2f7d69]">
                            <i className="fas fa-landmark"></i>
                        </div>
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            Keuangan Desa
                        </p>
                        <h1 className="mt-4 text-4xl font-extrabold text-[#5ee142] md:text-5xl">
                            APBDes
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-700">
                            Anggaran Pendapatan dan Belanja Desa Tanjung Putus — transparan dan akuntabel.
                        </p>
                    </div>

                    {!latest ? (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl text-gray-400">
                                <i className="fas fa-file-invoice"></i>
                            </div>
                            <p className="text-xl font-semibold text-gray-500">Belum ada data APBDes</p>
                        </div>
                    ) : (
                        <>
                            {/* Tahun navigasi */}
                            <div className="mb-10 flex flex-wrap justify-center gap-3">
                                {anggaran.map((a) => (
                                    <a
                                        key={a.id}
                                        href={`#tahun-${a.tahun}`}
                                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm transition ${
                                            a.id === latest.id
                                                ? 'border-[#5ee142] bg-[#5ee142] text-white'
                                                : 'border-gray-300 bg-white text-gray-700 hover:border-[#5ee142] hover:text-[#5ee142]'
                                        }`}
                                    >
                                        <i className="fas fa-calendar"></i>
                                        {a.tahun}
                                    </a>
                                ))}
                            </div>

                            {anggaran.map((a) => {
                                const sisa = Number(a.total_pendapatan) - Number(a.total_belanja);
                                const isLatest = a.id === latest.id;
                                return (
                                    <div key={a.id} id={`tahun-${a.tahun}`} className="mb-16">
                                        {/* Judul Tahun */}
                                        <div className="mb-8 text-center">
                                            <h2 className="text-3xl font-bold text-gray-900">
                                                Tahun Anggaran {a.tahun}
                                            </h2>
                                            {a.keterangan && (
                                                <p className="mt-1 text-sm text-gray-500">{a.keterangan}</p>
                                            )}
                                            <span className={`badge mt-2 ${
                                                a.status === 'realisasi' ? 'badge-success' :
                                                a.status === 'disetujui' ? 'badge-info' :
                                                a.status === 'ditolak' ? 'badge-error' : 'badge-ghost'
                                            } capitalize`}>{a.status}</span>
                                        </div>

                                        {/* Summary Cards */}
                                        <div className="mb-10 grid gap-5 sm:grid-cols-3">
                                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-600">
                                                    <i className="fas fa-arrow-down"></i>
                                                </div>
                                                <p className="text-sm font-medium text-gray-500">Total Pendapatan</p>
                                                <p className="mt-1 text-2xl font-extrabold text-emerald-600">{rupiah(a.total_pendapatan)}</p>
                                            </div>
                                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-xl text-rose-600">
                                                    <i className="fas fa-arrow-up"></i>
                                                </div>
                                                <p className="text-sm font-medium text-gray-500">Total Belanja</p>
                                                <p className="mt-1 text-2xl font-extrabold text-rose-600">{rupiah(a.total_belanja)}</p>
                                            </div>
                                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                                                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
                                                    sisa >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    <i className="fas fa-coins"></i>
                                                </div>
                                                <p className="text-sm font-medium text-gray-500">Sisa Anggaran</p>
                                                <p className={`mt-1 text-2xl font-extrabold ${sisa >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                                    {rupiah(sisa)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Pendapatan */}
                                        <div className="mb-10">
                                            <h3 className="mb-5 text-xl font-bold text-gray-900">
                                                <i className="fas fa-circle-dollar mr-2 text-emerald-500"></i>
                                                Pendapatan
                                            </h3>
                                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                                                {a.pendapatans.length > 0 ? (
                                                    <div className="divide-y divide-gray-100">
                                                        {a.pendapatans.map((p, i) => (
                                                            <div key={p.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                                                                        {i + 1}
                                                                    </span>
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">{p.sumber_pendapatan}</p>
                                                                        {p.keterangan && <p className="text-sm text-gray-500">{p.keterangan}</p>}
                                                                    </div>
                                                                </div>
                                                                <span className="shrink-0 font-semibold text-emerald-600">{rupiah(p.jumlah)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="py-4 text-center text-gray-400">Belum ada data pendapatan</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Belanja */}
                                        <div>
                                            <h3 className="mb-5 text-xl font-bold text-gray-900">
                                                <i className="fas fa-receipt mr-2 text-rose-500"></i>
                                                Belanja Desa
                                            </h3>
                                            <div className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                                                {a.belanjas.length > 0 ? (
                                                    <div className="divide-y divide-gray-100">
                                                        {a.belanjas.map((b, i) => (
                                                            <div key={b.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                                                <div className="flex items-center gap-3 min-w-0">
                                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">
                                                                        {i + 1}
                                                                    </span>
                                                                    <div className="min-w-0">
                                                                        <p className="font-medium text-gray-900 truncate">{b.kegiatan}</p>
                                                                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                                                            {b.kategori && (
                                                                                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                                                                                    style={{ backgroundColor: kategoriColor[b.kategori] || '#6b7280' }}>
                                                                                    <i className={`fas ${kategoriIcon[b.kategori] || 'fa-tag'} mr-0.5`}></i>
                                                                                    {b.kategori}
                                                                                </span>
                                                                            )}
                                                                            {b.lokasi && (
                                                                                <span className="text-xs text-gray-400">
                                                                                    <i className="fas fa-location-dot mr-1"></i>
                                                                                    {b.lokasi}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {b.keterangan && (
                                                                            <p className="mt-0.5 text-xs text-gray-500">{b.keterangan}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <span className="shrink-0 font-semibold text-rose-600">{rupiah(b.jumlah)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="py-4 text-center text-gray-400">Belum ada data belanja</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {/* Navigasi ke halaman lain */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/infografis"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#5ee142] hover:text-[#5ee142]"
                        >
                            <i className="fas fa-chart-pie"></i>
                            Lihat Infografis
                        </Link>
                        <Link
                            href="/desa"
                            className="inline-flex items-center gap-2 rounded-full bg-[#5ee142] px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            <i className="fas fa-arrow-left"></i>
                            Kembali ke Beranda
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
}
