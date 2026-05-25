import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const slides = [
        {
            image: "/images/desa1.jpg",
            title: "Selamat Datang di Website Desa",
            desc: "Informasi desa, pelayanan masyarakat, dan potensi desa terbaru.",
        },
        {
            image: "/images/desa2.jpg",
            title: "Pelayanan Desa Cepat & Mudah",
            desc: "Akses informasi dan layanan masyarakat secara online.",
        },
        {
            image: "/images/desa3.jpg",
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
                        Desa Anda
                    </h1>

                    <div className="hidden gap-8 md:flex">
                        {["Beranda", "Profil", "Berita", "Galeri", "Kontak"].map(
                            (item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`font-medium transition ${scrolled
                                        ? "text-gray-700 hover:text-green-700"
                                        : "text-white hover:text-green-300"
                                        }`}
                                >
                                    {item}
                                </Link>
                            )
                        )}
                    </div>
                </div>
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