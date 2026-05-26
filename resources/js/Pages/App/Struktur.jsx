import Navbar from './Navbar';
import { Link } from '@inertiajs/react';

const strukturItems = [
    { name: 'Kepala Desa', role: 'Kepala Desa' },
    { name: 'Sekretaris Desa', role: 'Sekretaris Desa' },
    { name: 'Kaur Pemerintahan', role: 'Kaur Pemerintahan' },
    { name: 'Kaur Keuangan', role: 'Kaur Keuangan' },
    { name: 'Kasi Pelayanan', role: 'Kasi Pelayanan' },
    { name: 'Kasi Kesejahteraan', role: 'Kasi Kesejahteraan' },
    { name: 'Kasi Pembangunan', role: 'Kasi Pembangunan' },
    { name: 'Kasi Pemerintahan', role: 'Kasi Pemerintahan' },
];

export default function Struktur() {
    return (
        <>
            <Navbar />

            <section className="bg-[#f7f7f7] py-24 text-gray-950">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#2f7d69]">
                            Struktur Organisasi Desa
                        </p>
                        <h1 className="mt-4 text-4xl font-extrabold text-[#5ee142] md:text-5xl">
                            Struktur dan Tata Kerja Desa
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-700">
                            Berikut adalah struktur organisasi desa beserta peran utamanya. Klik tombol kembali untuk melihat ringkasan di halaman utama.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {strukturItems.map((item) => (
                            <div key={item.name} className="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 h-16 w-16 rounded-full bg-[#e5f7eb] text-2xl font-bold text-green-700 flex items-center justify-center">
                                    {item.name
                                        .split(' ')
                                        .map((part) => part[0])
                                        .join('')}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                                <p className="mt-2 text-sm text-gray-600">{item.role}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/desa"
                            className="inline-flex items-center rounded-full bg-[#5ee142] px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
