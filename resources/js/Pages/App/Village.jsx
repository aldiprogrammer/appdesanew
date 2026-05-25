import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react'

export default function Village() {
    const slides = [
        { id: 1, title: 'Selamat Datang di Desa', subtitle: 'Desa Hijau dan Asri', image: '/uploads/slider/slide1.jpg' },
        { id: 2, title: 'Pelayanan Publik', subtitle: 'Cepat, Transparan, Ramah', image: '/uploads/slider/slide2.jpg' },
        { id: 3, title: 'Program UMKM', subtitle: 'Dukung Usaha Lokal', image: '/uploads/slider/slide3.jpg' },
    ]

    const features = [
        { id: 1, title: 'Pelayanan Online', desc: 'Permohonan surat, administrasi, dan lain-lain', icon: 'fas fa-file-alt' },
        { id: 2, title: 'UMKM Lokal', desc: 'Daftar usaha dan produk warga', icon: 'fas fa-store' },
        { id: 3, title: 'Berita Desa', desc: 'Informasi dan pengumuman resmi', icon: 'fas fa-newspaper' },
        { id: 4, title: 'Galeri', desc: 'Dokumentasi kegiatan desa', icon: 'fas fa-image' },
    ]

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Header */}
            <header className="bg-green-700 text-white fixed w-full z-20">
                <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <img src="/uploads/profil/logo.png" alt="logo" className="h-8 w-8 object-cover rounded-full" />
                        </div>
                        <div>
                            <div className="font-bold">Desa Hijau</div>
                            <div className="text-xs opacity-90">Kecamatan Contoh</div>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-4">
                        <a href="#home" className="text-sm">Beranda</a>
                        <a href="#layanan" className="text-sm">Layanan</a>
                        <a href="#berita" className="text-sm">Berita</a>
                        <a href="#kontak" className="text-sm">Kontak</a>
                    </nav>
                </div>
            </header>

            <main className="pt-20">
                {/* Slider / Jumbotron */}
                <section id="home" className="relative">
                    <div className="h-64 md:h-96 overflow-hidden">
                        {slides.map((s, i) => (
                            <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="h-64 md:h-96 bg-green-600" style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="bg-black/25 h-full flex items-center">
                                        <div className="max-w-4xl mx-auto p-6 text-white">
                                            <h2 className="text-2xl md:text-4xl font-bold">{s.title}</h2>
                                            <p className="mt-2 md:mt-4">{s.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider indicators */}
                    <div className="max-w-4xl mx-auto flex justify-center gap-2 mt-2">
                        {slides.map((s, i) => (
                            <button key={s.id} onClick={() => setIndex(i)} className={`h-2 w-8 rounded ${i === index ? 'bg-green-700' : 'bg-gray-300'}`}></button>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section id="layanan" className="max-w-4xl mx-auto p-4 mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-green-700">Fitur & Layanan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {features.map((f) => (
                            <div key={f.id} className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                                        <i className={`${f.icon}`}></i>
                                    </div>
                                    <div>
                                        <div className="font-medium">{f.title}</div>
                                        <div className="text-sm text-gray-500">{f.desc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Example sections: Berita & Galeri */}
                <section id="berita" className="max-w-4xl mx-auto p-4 mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-green-700">Berita Terbaru (Statik)</h3>
                    <div className="space-y-3">
                        <article className="bg-white p-4 rounded shadow-sm">
                            <h4 className="font-semibold">Pembangunan Jalan Desa Selesai</h4>
                            <p className="text-sm text-gray-600 mt-1">Proyek pembangunan jalan sepanjang 2 km telah selesai dikerjakan oleh masyarakat bersama pemerintah desa.</p>
                        </article>
                        <article className="bg-white p-4 rounded shadow-sm">
                            <h4 className="font-semibold">Pelatihan UMKM Lokal</h4>
                            <p className="text-sm text-gray-600 mt-1">Dinas setempat memberikan pelatihan pemasaran digital bagi pelaku UMKM Desa Hijau.</p>
                        </article>
                    </div>
                </section>

                <section id="galeri" className="max-w-4xl mx-auto p-4 mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-green-700">Galeri</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="h-28 bg-green-100 rounded"></div>
                        <div className="h-28 bg-green-100 rounded"></div>
                        <div className="h-28 bg-green-100 rounded"></div>
                    </div>
                </section>

                {/* Contact */}
                <section id="kontak" className="max-w-4xl mx-auto p-4 mt-6 mb-12">
                    <h3 className="text-lg font-semibold mb-3 text-green-700">Kontak Desa</h3>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">Kantor Desa</div>
                                <div className="font-medium">Jl. Raya Desa No.1</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Telepon</div>
                                <div className="font-medium">(021) 12345678</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Email</div>
                                <div className="font-medium">info@desahijau.id</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
