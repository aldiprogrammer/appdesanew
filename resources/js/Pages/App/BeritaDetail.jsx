import React from 'react';
import Navbar from './Navbar';
import { Link } from '@inertiajs/react';

export default function BeritaDetail({ berita }) {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-6xl px-6 py-16 lg:px-20">
                <div className="mb-8">
                    <Link href="/berita" className="text-sm font-semibold text-[#5ee142] hover:text-green-700">
                        ← Kembali ke Daftar Berita
                    </Link>
                </div>

                <article className="overflow-hidden rounded-3xl border border-base-200 bg-white shadow-lg">
                    {berita?.foto ? (
                        <img src={berita.foto} alt={berita.judul} className="h-96 w-full object-cover" />
                    ) : (
                        <div className="h-96 w-full bg-gray-200" />
                    )}
                    <div className="p-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">{berita?.judul}</h1>
                        <p className="mt-4 text-sm text-gray-500">Dipublikasikan pada: {new Date(berita?.created_at).toLocaleDateString()}</p>
                        <div className="mt-8 text-gray-700 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: berita?.keterangan || '' }} />
                    </div>
                </article>
            </main>
        </>
    );
}
