import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminLogin({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.attempt'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Login" />

            <div className="flex min-h-screen bg-[#0f172a]">
                {/* Left Side — Branding */}
                <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-12 lg:flex">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white"></div>
                        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-white"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4">

                            {/* <div>
                                <h1 className="text-xl font-bold text-white">APPDes</h1>
                                <p className="text-xs text-white/60">Admin Panel</p>
                            </div> */}
                        </div>
                    </div>

                    <div className="relative z-10">
                        <center>
                            <img src="/logo/langkat.png" alt="Pemerintah Kabupaten Langkat" className="h-30 w-auto" />

                            <blockquote className="text-2xl font-light leading-relaxed text-white mt-2">
                                ADMIN DESA TANJUNG PUTUS
                            </blockquote>
                            <p className="text-sm text-white /60">
                                Sistem Informasi Desa — Kelola data desa dengan mudah dan profesional.
                            </p>
                        </center>
                    </div>

                    <div className="relative z-10  text-align-center">
                        <div className="flex items-center gap-4 text-sm text-white/50 ">
                            <span>&copy; {new Date().getFullYear()} APPDestanjungputus</span>
                            <span className="h-3 w-px bg-white/20"></span>
                            <Link href="/desa" className="transition hover:text-white">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>

                {/* Right Side — Login Form */}
                <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
                    <div className="w-full max-w-md">
                        {/* Mobile logo */}
                        <div className="mb-8 text-center lg:hidden">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                                <i className="fas fa-desktop text-2xl"></i>
                            </div>
                            <h1 className="text-2xl font-bold text-white">APPDes</h1>
                            <p className="text-sm text-gray-400">Admin Panel</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white">Selamat Datang</h2>
                            <p className="mt-2 text-gray-400">Silakan masuk ke panel administrasi desa tanjung putus.</p>
                        </div>

                        {status && (
                            <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Username
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                                        <i className="fas fa-user text-sm"></i>
                                    </span>
                                    <input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="w-full rounded-xl border border-gray-700 bg-[#1e293b] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        placeholder="Masukkan username"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                                        <i className="fas fa-lock text-sm"></i>
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-xl border border-gray-700 bg-[#1e293b] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        placeholder="Masukkan password"
                                        autoComplete="current-password"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-600 bg-[#1e293b] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-gray-400">Ingat saya</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/35 disabled:opacity-60"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Memproses...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-arrow-right-to-bracket"></i>
                                        Masuk ke Admin
                                    </span>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs text-gray-500 lg:hidden">
                            &copy; {new Date().getFullYear()} APPDes — Desa Tanjung Putus
                        </p>
                    </div>
                </div>
            </div >
        </>
    );
}
