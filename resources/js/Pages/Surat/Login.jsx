import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SuratLogin() {
    const { errors: serverErrors = {}, flash = {} } = usePage().props;
    const [nik, setNik] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (flash.success) {
            // just show
        }
        if (Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
        }
    }, [flash, serverErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/surat/login', { nik, password, remember }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onError: (err) => setErrors(err),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center px-4 py-12">
            <Head title="Login - Layanan Surat" />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm mb-4">
                        <i className="fas fa-file-lines text-3xl"></i>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">Layanan Surat Digital</h1>
                    <p className="mt-2 text-white/80 text-sm">Desa Tanjung Putus</p>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Masuk</h2>
                    <p className="text-sm text-gray-500 mb-6">Masukkan NIK dan password Anda.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">NIK</label>
                            <input
                                type="text"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nomor Induk Kependudukan"
                                maxLength="25"
                                required
                            />
                            {errors.nik && <p className="mt-1 text-sm text-error">{errors.nik}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Password"
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="checkbox checkbox-primary checkbox-sm" />
                            <span className="text-sm text-gray-600">Ingat saya</span>
                        </label>

                        <button type="submit" disabled={processing} className="btn btn-primary w-full">
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Belum punya akun?{' '}
                        <Link href="/surat/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
                            Daftar di sini
                        </Link>
                    </div>

                    <div className="mt-4 text-center">
                        <Link href="/desa" className="text-xs text-gray-400 hover:text-gray-600">
                            <i className="fas fa-arrow-left mr-1"></i>Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
