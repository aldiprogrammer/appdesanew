import Navbar from "./Navbar";
import { Link } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';

const exploreItems = [
    {
        title: "PROFIL DESA",
        href: "#profil-desa",
        icon: (
            <svg viewBox="0 0 96 96" className="h-28 w-28" aria-hidden="true">
                <path d="M20 38h48L44 20 20 38Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <path d="M23 42h42v36H23V42Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" />
                <path d="M31 42v36M41 42v36M51 42v36" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                <path d="M18 78h52" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                <path d="M47 18V8h16l-5 5 5 5H47Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <circle cx="44" cy="28" r="6" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M69 48h18v32H69V48Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" />
                <path d="M69 48l-8-10h18l8 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <path d="M75 57h8M75 65h8M75 73h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
            </svg>
        ),
    },
    {
        title: "INFOGRAFIS",
        href: "#infografis",
        icon: (
            <svg viewBox="0 0 96 96" className="h-28 w-28" aria-hidden="true">
                <path d="M18 12v64a8 8 0 0 0 8 8h58" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
                <path d="M33 72V58M47 72V47M61 72V36M75 72V28" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
                <path d="M31 46c14-4 23-12 32-25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                <path d="M63 21h16v16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                <circle cx="31" cy="72" r="3" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: "IDM",
        href: "#idm",
        icon: (
            <svg viewBox="0 0 96 96" className="h-28 w-28" aria-hidden="true">
                <path d="m22 25 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" />
                <path d="m48 13 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" />
                <path d="m74 25 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" />
                <path d="M43 52h10l7-18c1-3 6-2 8 0 2 3 2 7 1 10l-2 7h13c5 0 8 5 6 10l-6 16c-1 4-5 6-9 6H53c-4 0-7-1-10-4V52Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                <path d="M28 51h15v31H28V51Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="5" />
            </svg>
        ),
    },
    {
        title: "PPID",
        href: "#ppid",
        icon: (
            <svg viewBox="0 0 96 96" className="h-28 w-28" aria-hidden="true">
                <path d="M28 14h38l17 17v47a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="5" />
                <path d="M66 14v17h17" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="5" />
                <path d="M35 43h26M35 55h33M35 67h24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
            </svg>
        ),
    },
];

export default function Home({ profil, kepalaDesaPhoto, berita = [], umkm = [] }) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    const kepalaDesaName = profil?.kepala_desa || "Kepala Desa";
    const sambutan = profil?.sambutan || "Selamat datang di website resmi desa kami. Media ini hadir sebagai sarana informasi, komunikasi, dan pelayanan bagi seluruh masyarakat. Semoga website ini dapat memperkuat keterbukaan pemerintah desa serta menjadi ruang bersama untuk mengenal potensi, program, dan perkembangan desa.";
    const kepalaDesaImage = kepalaDesaPhoto || "/uploads/pegawai/1779436076_6a100a2c95704.jpg";

    const desaLocation = {
        latitude: 3.82088,
        longitude: 98.21595,
    };

    const orgItems = [
        {
            name: 'Rina Jayanti',
            role: 'Kaur Keuangan',
        },
        {
            name: 'Marliana',
            role: 'Kepala Seksi Pelayanan dan Kesejahteraan',
        },
        {
            name: 'Alfiah Ramadhani Ampat',
            role: 'Kaur Umum dan Perencanaan',
        },
        {
            name: 'Safitriyani',
            role: 'Kasi Pemerintahan',
        },
    ];

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        const map = L.map(mapContainerRef.current, {
            center: [desaLocation.latitude, desaLocation.longitude],
            zoom: 13,
            scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const marker = L.marker([desaLocation.latitude, desaLocation.longitude]).addTo(map);
        marker.bindPopup(
            `<div class="font-semibold">Desa Tanjung Putus</div><div class="text-xs">Kec. Padang Tualang, Kab. Langkat, Sumatera Utara</div>`,
        );
        marker.openPopup();

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <>
            <Navbar />

            <section id="profil" className="bg-[#f7f7f7] py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-20 mt-8">
                    <div className="max-w-xl">
                        <h2 className="text-[34px] font-extrabold leading-none text-[#5ee142] md:text-[36px]">
                            JELAJAHI DESA
                        </h2>
                        <p className="mt-2 text-[15px] font-medium leading-[1.65] text-black md:text-base">
                            Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan
                            desa. Aspek pemerintahan, penduduk, demografi, potensi desa, dan juga
                            berita tentang desa.
                        </p>
                    </div>

                    <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:gap-x-8">
                        {exploreItems.map((item, index) => (
                            <a
                                key={item.title}
                                href={item.href}
                                className={`group relative flex h-32 items-end justify-center rounded bg-white px-6 pb-5 text-center text-[13px] font-bold text-gray-700 shadow-[0_2px_5px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.12)] ${index % 2 === 0 ? "sm:justify-self-end" : "sm:justify-self-start"
                                    } w-full sm:w-52 md:w-56 lg:w-[202px]`}
                            >
                                <span className="absolute -top-14 text-[#2f7d69] transition duration-300 group-hover:text-green-600">
                                    {item.icon}
                                </span>
                                <span>{item.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section id="sambutan" className="bg-white py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-20">
                    <div className="relative mx-auto w-full max-w-sm md:mx-0">
                        <div className="absolute -left-4 -top-4 h-full w-full rounded bg-[#5ee142]" />
                        <div className="relative overflow-hidden rounded bg-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                            <img
                                src={kepalaDesaImage}
                                alt={kepalaDesaName}
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
                            {sambutan}
                        </p>

                        <div className="mt-8 border-l-4 border-[#5ee142] pl-5">
                            <p className="text-lg font-extrabold text-gray-900">{kepalaDesaName}</p>
                            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                                Kepala Desa
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="peta-desa" className="bg-[#f7f7f7] py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            PETA DESA
                        </p>
                        <h2 className="mt-4 text-[34px] font-extrabold leading-none text-[#5ee142] md:text-[42px]">
                            Lokasi Desa Tanjung Putus
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-[1.65] text-gray-700 md:text-base">
                            Titik peta menunjukkan alamat Desa Tanjung Putus, Kecamatan Padang Tualang,
                            Kabupaten Langkat, Provinsi Sumatera Utara.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-base-300 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.08)]">
                        <div className="h-[520px] w-full z-0" ref={mapContainerRef} style={{ zIndex: 0 }} />
                        <div className="border-t border-base-200 bg-[#f7f7f7] p-6 text-sm text-gray-600">
                            <p className="font-semibold text-gray-900">Alamat:</p>
                            <p>Desa Tanjung Putus, Kecamatan Padang Tualang, Kabupaten Langkat, Sumatera Utara</p>
                            <p className="mt-2">Koordinat: {desaLocation.latitude.toFixed(6)}, {desaLocation.longitude.toFixed(6)}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="struktur" className="bg-white py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            Struktur Organisasi Desa
                        </p>
                        <h2 className="mt-4 text-[34px] font-extrabold leading-none text-[#5ee142] md:text-[42px]">
                            TANJUNG PUTUS
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-[1.65] text-gray-700 md:text-base">
                            Menampilkan beberapa anggota struktur organisasi desa. Klik tombol untuk melihat struktur lengkap.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                        {orgItems.map((item) => (
                            <div key={item.name} className="overflow-hidden rounded-3xl border border-base-200 bg-[#f7f7f7] p-6 text-center shadow-sm">
                                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#e5f7eb] text-2xl font-bold text-green-700">
                                    {item.name
                                        .split(' ')
                                        .map((part) => part[0])
                                        .join('')}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                                    <p className="mt-2 text-sm text-gray-600">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/struktur"
                            className="inline-flex items-center rounded-full bg-[#5ee142] px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            Lihat Struktur Lebih Lengkap
                        </Link>
                    </div>
                </div>
            </section>
            <section id="berita" className="bg-[#f7f7f7] py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">BERITA</p>
                        <h2 className="mt-4 text-[34px] font-extrabold leading-none text-[#5ee142] md:text-[42px]">Berita Desa</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-[1.65] text-gray-700 md:text-base">
                            Berita terbaru dari desa.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols">
                        {berita && berita.length > 0 ? berita.map((b) => (
                            <Link href={`/berita/${b.id}`} key={b.id} className="overflow-hidden rounded-3xl border border-base-200 bg-white shadow-sm block">
                                {b.foto ? (
                                    <img src={b.foto} alt={b.judul} className="h-40 w-full object-cover" />
                                ) : (
                                    <div className="h-40 w-full bg-gray-200" />
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{b.judul}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{(b.keterangan || '').length > 120 ? `${(b.keterangan || '').slice(0, 120)}...` : (b.keterangan || '')}</p>
                                </div>
                            </Link>
                        )) : (
                            <p className="text-center text-gray-600">Belum ada berita.</p>
                        )}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/berita"
                            className="inline-flex items-center rounded-full bg-[#5ee142] px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            Lihat Selengkapnya
                        </Link>
                    </div>
                </div>
            </section>


            <section id="berita" className="bg-white py-16 font-['Poppins',sans-serif] text-gray-950 md:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-20">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">UMKM</p>
                        <h2 className="mt-4 text-[34px] font-extrabold leading-none text-[#5ee142] md:text-[42px]">UMKM Desa Tanjung Putus</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-[1.65] text-gray-700 md:text-base">
                            Daftar UMKM yang ada di desa. Klik tombol untuk melihat daftar UMKM lengkap.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                        {umkm && umkm.length > 0 ? umkm.map((b) => {
                            const isPromo = /(promo|diskon|sale|potongan)/i.test(b.keterangan || '');

                            return (
                                <Link href={`/umkm/${b.id}`} key={b.id} className="relative overflow-hidden rounded-3xl border border-base-200 bg-white shadow-lg block">
                                    {b.foto1 ? (
                                        <img src={b.foto1} alt={b.judul} className="h-40 w-full object-cover" />
                                    ) : (
                                        <div className="h-40 w-full bg-gray-200" />
                                    )}
                                    <div className="absolute top-3 left-3 z-20">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 gap-1 text-xs font-bold text-white shadow ${isPromo ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}>
                                            <i className="fas fa-shopping-bag"></i> <div> UMKM</div>
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{b.nama_usaha.slice(0, 7)}..</h3>
                                        <p className="mt-2 text-sm text-gray-600"><i className="fas fa-map-marker-alt"></i> {(b.alamat || '').length > 120 ? `${(b.alamat || '').slice(0, 20)}...` : (b.alamat || '')}</p>
                                        <button className="mt-4  rounded-full bg-[#5ee142] px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 w-full text-center">
                                            {b.nohp}
                                        </button>
                                    </div>
                                </Link>
                            )
                        }) : (
                            <p className="text-center text-gray-600">Belum ada berita.</p>
                        )}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/berita"
                            className="inline-flex items-center rounded-full bg-[#5ee142] px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            Lihat Selengkapnya
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
