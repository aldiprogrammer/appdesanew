import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const slides = [
        {
            image: "https://tse1.mm.bing.net/th/id/OIP.T_pZvSA5KvLL6kBjZC_tVwHaFj?pid=Api&P=0&h=180",
            title: "Selamat Datang di Website Desa",
            desc: "Informasi desa, pelayanan masyarakat, dan potensi desa terbaru.",
        },
        {
            image: "https://tse4.mm.bing.net/th/id/OIP.Hu5QvfdV-n0a8KHJa9JlZQHaE8?pid=Api&P=0&h=180",
            title: "Pelayanan Desa Cepat & Mudah",
            desc: "Akses informasi dan layanan masyarakat secara online.",
        },
        {
            image: "https://tse4.mm.bing.net/th/id/OIP.CscU84UHsTxt-GG3GYXgbAHaEK?pid=Api&P=0&h=180",
            title: "Membangun Desa Bersama",
            desc: "Transparan, maju, dan bermanfaat untuk masyarakat.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-white shadow-md py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <h1
                        className={`text-2xl font-bold ${scrolled ? "text-green-700" : "text-white"
                            }`}
                    >
                        Desa Tanjung Putus
                    </h1>

                    <div className="hidden items-center gap-1 md:flex">
                        <Link href="/desa" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-home mr-1.5"></i>Beranda</Link>
                        <Link href="#profil" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-info-circle mr-1.5"></i>Profil</Link>
                        <Link href="/infografis" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-chart-pie mr-1.5"></i>Infografis</Link>
                        <Link href="/apbdes" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-landmark mr-1.5"></i>APBDes</Link>
                        <Link href="/pengaduan" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-bullhorn mr-1.5"></i>Pengaduan</Link>
                        <Link href="/kontak-layanan" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-phone mr-1.5"></i>Kontak</Link>
                        <Link href="#struktur" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-sitemap mr-1.5"></i>Struktur</Link>
                        <Link href="/surat/login" className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-file-lines mr-1.5"></i>Surat</Link>
                    </div>
                    <button onClick={() => setMenuOpen(!menuOpen)} className={`flex h-9 w-9 items-center justify-center rounded-lg transition md:hidden ${scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}>
                        <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
                    </button>
                </div>
                {menuOpen && (
                    <div className={`border-t px-6 py-4 md:hidden ${scrolled ? "border-gray-100 bg-white" : "border-white/10 bg-black/80 backdrop-blur-md"}`}>
                        <div className="flex flex-col gap-2">
                            <Link href="/desa" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-home mr-2"></i>Beranda</Link>
                            <Link href="#profil" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-info-circle mr-2"></i>Profil</Link>
                            <Link href="/infografis" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-chart-pie mr-2"></i>Infografis</Link>
                            <Link href="/apbdes" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-landmark mr-2"></i>APBDes</Link>
                            <Link href="/pengaduan" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-bullhorn mr-2"></i>Pengaduan</Link>
                            <Link href="/kontak-layanan" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-phone mr-2"></i>Kontak</Link>
                            <Link href="#struktur" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-sitemap mr-2"></i>Struktur</Link>
                            <Link href="/surat/login" className={`rounded-lg px-4 py-2 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600" : "text-white/90 hover:bg-white/10 hover:text-white"}`}><i className="fas fa-file-lines mr-2"></i>Surat</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Slider */}
            <section className="relative h-screen overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                    >
                        {/* background */}
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            {/* overlay */}
                            <div className="flex h-full items-center bg-black/50">
                                <div className="mx-auto max-w-7xl px-6 text-white">
                                    <div className="max-w-3xl">
                                        <h2 className="mb-4 text-4xl font-bold md:text-6xl">
                                            {slide.title}
                                        </h2>

                                        <p className="mb-8 text-lg md:text-2xl">
                                            {slide.desc}
                                        </p>

                                        <Link
                                            href="#profil"
                                            className="rounded-xl bg-green-600 px-8 py-4 font-semibold transition hover:bg-green-700"
                                        >
                                            Lihat Profil Desa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* indikator */}
                <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-3 w-3 rounded-full ${currentSlide === i
                                ? "bg-white"
                                : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}