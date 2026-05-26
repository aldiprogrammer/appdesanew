import React from 'react';
import Navbar from './Navbar';
import { Link } from '@inertiajs/react';

export default function BeritaList({ berita = [] }) {
    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-20">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-[#5ee142]">Berita Desa</h1>
                    <p className="mt-2 text-gray-600">Daftar berita terbaru dari desa.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {berita && berita.length > 0 ? berita.map((b) => (
                        <article key={b.id} className="overflow-hidden rounded-lg border bg-white shadow">
                            {b.foto ? <img src={b.foto} alt={b.judul} className="h-48 w-full object-cover" /> : <div className="h-48 w-full bg-gray-200" />}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900">{b.judul}</h2>
                                <p className="mt-2 text-sm text-gray-600">{(b.keterangan || '').slice(0, 200)}{(b.keterangan || '').length > 200 ? '...' : ''}</p>
                                <div className="mt-4 text-right">
                                    <Link href={`/berita/${b.id}`} className="text-sm font-semibold text-[#5ee142]">Baca Selengkapnya</Link>
                                </div>
                            </div>
                        </article>
                    )) : (
                        <p className="text-center text-gray-600">Belum ada berita.</p>
                    )}
                </div>
            </div>
        </>
    );
}
