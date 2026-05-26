import { Link } from '@inertiajs/react'
import React from 'react'

export default function ProfilDesa({ profil, kades, dusun = [] }) {
    return (
        <>
            <nav
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 bg-green-600 py-4 text-white`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <h1
                        className={`text-2xl font-bold`}
                    >
                        Desa Anda
                    </h1>

                    <div className="hidden gap-8 md:flex">
                        {["Beranda", "Profil", "Berita", "Galeri", "Kontak"].map(
                            (item) => (
                                <Link
                                    key={item}

                                    className={`font-medium transition`}
                                >
                                    {item}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </nav>

            <section id="sambutan" className="bg-white py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-20 mt-10">
                    <div className="relative mx-auto w-full max-w-sm md:mx-0">
                        <div className="absolute -left-4 -top-4 h-full w-full rounded bg-[#5ee142]" />
                        <div className="relative overflow-hidden rounded bg-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                            <img
                                src={kades?.foto || 'https://via.placeholder.com/400x400?text=Kepala+Desa'}
                                className="h-[420px] w-full object-cover object-top"
                            />
                        </div>
                    </div>

                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            Kata Sambutan
                        </p>
                        <h2 className="mt-3 text-[32px] font-extrabold leading-tight text-[#5ee142] md:text-[42px]">
                            KEPALA DESA
                        </h2>
                        <p className="mt-5 text-[15px] font-medium leading-[1.9] text-gray-800 md:text-base">
                            {profil?.sambutan || 'Belum ada kata sambutan.'}
                        </p>

                        <div className="mt-8 border-l-4 border-[#5ee142] pl-5">
                            <p className="text-lg font-extrabold text-gray-900">{profil.kepala_desa}</p>
                            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                                Kepala Desa
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="visi-misi" className="bg-[#f7f7f7] py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            Visi & Misi
                        </p>
                        <h2 className="mt-4 text-[34px] font-extrabold leading-none text-[#5ee142] md:text-[42px]">
                            Membangun Desa yang Maju dan Berkelanjutan
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-[1.75] text-gray-700 md:text-base">
                            Visi dan misi desa ini menjadi pedoman pembangunan, pemberdayaan masyarakat, dan pelestarian lingkungan.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <article className="rounded-[32px] border border-base-200 bg-white p-8 shadow-[0_22px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-lg">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
                                    <path d="M12 3l7 6-7 8-7-8 7-6Z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900">Visi</h3>
                            <p className="mt-5 text-gray-700 leading-relaxed">
                                {profil?.visi || 'Belum ada visi.'}
                            </p>
                        </article>

                        <article className="rounded-[32px] border border-base-200 bg-white p-8 shadow-[0_22px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-700 to-emerald-500 text-white shadow-lg">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
                                    <path d="M5 12h14M5 6h14M5 18h14" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900">Misi</h3>
                            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
                                {profil?.misi ? (
                                    profil.misi.split('\n').map((item, index) => (
                                        <p key={index} className="text-sm">{item.trim()}</p>
                                    ))
                                ) : (
                                    <p>Belum ada misi.</p>
                                )}
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="dusun" className="relative overflow-hidden bg-gradient-to-b from-white to-[#fafdfb] py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mb-12 text-center">
                        <span className="inline-block rounded-full bg-emerald-100 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                            Data Dusun
                        </span>
                        <h2 className="mt-5 text-[34px] font-extrabold leading-none text-gray-900 md:text-[42px]">
                            Wilayah{' '}
                            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                                Dusun
                            </span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-relaxed text-gray-600 md:text-base">
                            Berikut adalah daftar dusun yang ada di wilayah desa beserta informasi luas wilayah masing-masing.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
                        {dusun.length > 0 ? dusun.map((item, index) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden rounded-[28px] border border-emerald-100/60 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(5,150,105,0.12)]"
                            >
                                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 to-green-400" />

                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                        <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-600 shadow-sm ring-1 ring-emerald-200/50">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 sm:h-5 sm:w-5">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
                                                Dusun #{String(index + 1).padStart(2, '0')}
                                            </p>
                                            <h3 className="truncate text-sm sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                {item.nama_dusun}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                                        <div className="rounded-lg sm:rounded-xl bg-[#f0fdf4] p-2.5 sm:p-3.5 transition-colors group-hover:bg-emerald-50">
                                            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-gray-500">Luas</p>
                                            <p className="mt-0.5 sm:mt-1 text-sm sm:text-lg font-extrabold text-gray-900">
                                                {item.luas_wilayah
                                                    ? new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.luas_wilayah)
                                                    : '-'}
                                                <span className="ml-0.5 text-[10px] sm:text-sm font-medium text-gray-500">ha</span>
                                            </p>
                                        </div>
                                        <div className="rounded-lg sm:rounded-xl bg-[#faf5ff] p-2.5 sm:p-3.5 transition-colors group-hover:bg-purple-50">
                                            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-gray-500">Status</p>
                                            <p className="mt-0.5 sm:mt-1 inline-block rounded-full bg-emerald-100 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-700">
                                                {item.status === 1 ? 'Aktif' : 'Nonaktif'}
                                            </p>
                                        </div>
                                    </div>

                                    {(item.latitude && item.longitude) && (
                                        <div className="mt-2 sm:mt-3 flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-gray-50 px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-medium text-gray-500">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-gray-400">
                                                <path d="M2 12h4M18 12h4M12 2v4M12 18v4" strokeLinecap="round" />
                                                <circle cx="12" cy="12" r="2" />
                                            </svg>
                                            <span className="truncate">
                                                {Number(item.latitude).toFixed(4)}, {Number(item.longitude).toFixed(4)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full rounded-[28px] border border-dashed border-gray-300 bg-white/60 p-14 text-center shadow-sm backdrop-blur-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-gray-400">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="text-base font-semibold text-gray-900">Belum Ada Data Dusun</p>
                                <p className="mt-1.5 text-sm text-gray-500">Data dusun akan tampil di sini setelah ditambahkan oleh admin.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    )
}
