import Navbar from './Navbar';
import { Link } from '@inertiajs/react';

const colors = [
    'from-emerald-500 to-emerald-600',
    'from-blue-500 to-blue-600',
    'from-violet-500 to-violet-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-teal-500 to-teal-600',
    'from-cyan-500 to-cyan-600',
    'from-rose-500 to-rose-600',
    'from-amber-500 to-amber-600',
    'from-lime-500 to-lime-600',
    'from-indigo-500 to-indigo-600',
    'from-red-500 to-red-600',
];

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

export default function Infografis({ total, lakiLaki, perempuan, kepalaKeluarga, agama, pekerjaan, statusKawin, totalStanting, stantingPerDusun, totalBansos, bansosPerKategori }) {
    const items = [
        {
            label: 'Total Penduduk',
            value: total.toLocaleString(),
            icon: 'fa-users',
            color: 'from-[#5ee142] to-[#3cb830]',
            bg: 'bg-[#e5f7eb]',
        },
        {
            label: 'Laki-laki',
            value: lakiLaki.toLocaleString(),
            icon: 'fa-mars',
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
        },
        {
            label: 'Perempuan',
            value: perempuan.toLocaleString(),
            icon: 'fa-venus',
            color: 'from-pink-500 to-pink-600',
            bg: 'bg-pink-50',
        },
        {
            label: 'Kepala Keluarga',
            value: kepalaKeluarga.toLocaleString(),
            icon: 'fa-house-chimney-user',
            color: 'from-[#2f7d69] to-[#1f5d49]',
            bg: 'bg-[#e0f0ec]',
        },
    ];

    return (
        <>
            <Navbar />

            <section className="bg-[#f7f7f7] py-24 text-gray-950">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5f7eb] text-3xl text-[#2f7d69]">
                            <i className="fas fa-chart-pie"></i>
                        </div>
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            Data Penduduk
                        </p>
                        <h1 className="mt-4 text-4xl font-extrabold text-[#5ee142] md:text-5xl">
                            Infografis Penduduk Desa
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-700">
                            Statistik kependudukan Desa Tanjung Putus berdasarkan data terkini.
                        </p>
                    </div>

                    {/* Navigasi Section */}
                    <div className="mb-12 flex flex-wrap justify-center gap-3">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-[#5ee142] hover:text-[#5ee142]"
                            >
                                <i className={`fas ${s.icon}`}></i>
                                {s.label}
                            </a>
                        ))}
                    </div>

                    <div id="penduduk" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                        {items.map((item) => (
                            <div
                                key={item.label}
                                className="group rounded-3xl border border-base-200 bg-green-300 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div
                                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} text-2xl text-gray-700 bg-white transition-transform group-hover:scale-110`}
                                >
                                    <i className={`fas ${item.icon}`}></i>
                                </div>
                                <p className="text-4xl font-extrabold text-gray-900">
                                    {item.value}
                                </p>
                                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 grid gap-6 sm:grid-cols-2">
                        <div className="rounded-3xl border border-base-200 bg-white p-8 shadow-sm">
                            <h3 className="mb-6 text-lg font-semibold text-gray-800">
                                <i className="fas fa-venus-mars mr-2 text-blue-500"></i>
                                Perbandingan Jenis Kelamin
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <div className="mb-2 flex justify-between text-sm font-medium">
                                        <span className="text-blue-600">Laki-laki</span>
                                        <span>{lakiLaki.toLocaleString()}</span>
                                    </div>
                                    <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                                            style={{
                                                width: `${total ? (lakiLaki / total) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 flex justify-between text-sm font-medium">
                                        <span className="text-pink-600">Perempuan</span>
                                        <span>{perempuan.toLocaleString()}</span>
                                    </div>
                                    <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all"
                                            style={{
                                                width: `${total ? (perempuan / total) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-base-200 bg-white p-8 shadow-sm">
                            <h3 className="mb-6 text-lg font-semibold text-gray-800">
                                <i className="fas fa-chart-simple mr-2 text-emerald-500"></i>
                                Ringkasan Data
                            </h3>
                            <div className="space-y-4 text-sm">
                                {[
                                    ['Total Penduduk', total.toLocaleString()],
                                    ['Laki-laki', lakiLaki.toLocaleString()],
                                    ['Perempuan', perempuan.toLocaleString()],
                                    ['Kepala Keluarga', kepalaKeluarga.toLocaleString()],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
                                    >
                                        <span className="text-gray-600">{label}</span>
                                        <span className="font-semibold text-gray-900">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Agama */}
                    <div id="agama" className="mt-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                <i className="fas fa-place-of-worship mr-2 text-emerald-500"></i>
                                Agama
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">Distribusi penduduk berdasarkan agama</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 grid-cols-2">
                            {agama.map((item, i) => (
                                <div key={item.label} className={`rounded-3xl border border-base-200 p-6 shadow-sm text-center ${i === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-white'}`}>
                                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-sm text-2xl text-gray-600">
                                        <i className={`fas ${agamaIcons[item.label] || 'fa-place-of-worship'}`}></i>
                                    </div>
                                    <p className="text-3xl font-extrabold text-gray-900">{item.total.toLocaleString()}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-500">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pekerjaan */}
                    <div id="pekerjaan" className="mt-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                <i className="fas fa-briefcase mr-2 text-violet-500"></i>
                                Pekerjaan
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">Distribusi penduduk berdasarkan pekerjaan</p>
                        </div>
                        <div className="rounded-3xl border border-base-200 bg-white p-8 shadow-sm">
                            <div className="grid gap-5 sm:grid-cols-2">
                                {pekerjaan.filter((_, i) => i < 16).map((item, i) => (
                                    <div key={item.label}>
                                        <div className="mb-2 flex items-center justify-between text-sm font-medium">
                                            <span className="truncate">
                                                <i className="fas fa-user-check mr-2 text-gray-400"></i>
                                                {item.label}
                                            </span>
                                            <span className="text-gray-600 shrink-0 ml-2">{item.total.toLocaleString()}</span>
                                        </div>
                                        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
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

                    {/* Status Kawin */}
                    <div id="kawin" className="mt-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                <i className="fas fa-ring mr-2 text-pink-500"></i>
                                Status Perkawinan
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">Distribusi penduduk berdasarkan status perkawinan</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                            {statusKawin.map((item, i) => (
                                <div key={item.label} className="rounded-3xl border border-base-200 bg-green-400 p-8 shadow-sm text-center">
                                    <div className="mb-3 text-3xl text-white">
                                        <i className={`fas ${['fa-user', 'fa-user-check', 'fa-user-slash', 'fa-user-xmark'][i] || 'fa-user'}`}></i>
                                    </div>
                                    <p className="text-4xl font-extrabold text-white">{item.total.toLocaleString()}</p>
                                    <p className="mt-2 text-sm font-bold uppercase tracking-wider text-black ">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stanting */}
                    <div id="stanting" className="mt-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                <i className="fas fa-child mr-2 text-orange-500"></i>
                                Stanting
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">Data anak stanting berdasarkan dusun</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                            <div className="rounded-3xl border border-base-200 bg-orange-400 p-6 shadow-sm text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-orange-500">
                                    <i className="fas fa-child"></i>
                                </div>
                                <p className="text-3xl font-extrabold text-white">{totalStanting.toLocaleString()}</p>
                                <p className="mt-1 text-sm font-bold uppercase tracking-wider text-black">Total Stanting</p>
                            </div>
                            {stantingPerDusun.map((item) => (
                                <div key={item.nama_dusun} className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm text-center">
                                    <p className="text-3xl font-extrabold text-gray-900">{item.total.toLocaleString()}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-500">{item.nama_dusun}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bansos */}
                    <div id="bansos" className="mt-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                <i className="fas fa-hand-holding-heart mr-2 text-red-500"></i>
                                Bantuan Sosial
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">Data penerima bantuan sosial berdasarkan kategori</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                            <div className="rounded-3xl border border-base-200 bg-red-400 p-6 shadow-sm text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-red-500">
                                    <i className="fas fa-hand-holding-heart"></i>
                                </div>
                                <p className="text-3xl font-extrabold text-white">{totalBansos.toLocaleString()}</p>
                                <p className="mt-1 text-sm font-bold uppercase tracking-wider text-black">Total Penerima</p>
                            </div>
                            {bansosPerKategori.map((item) => (
                                <div key={item.nama_bantuan} className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm text-center">
                                    <p className="text-3xl font-extrabold text-gray-900">{item.total.toLocaleString()}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-500">{item.nama_bantuan}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 text-center">
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
