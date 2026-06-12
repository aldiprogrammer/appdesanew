import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SuratRegister({ dusunList }) {
    const { errors: serverErrors = {}, flash = {} } = usePage().props;
    const [nik, setNik] = useState('');
    const [dusun, setDusun] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
        }
    }, [serverErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/surat/register', {
            nik,
            dusun,
            password,
            password_confirmation: passwordConfirmation,
        }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onError: (err) => setErrors(err),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center px-4 py-12">
            <Head title="Daftar - Layanan Surat" />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm mb-4">
                        <i className="fas fa-user-plus text-3xl"></i>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">Buat Akun Baru</h1>
                    <p className="mt-2 text-white/80 text-sm">Layanan Surat Digital Desa Tanjung Putus</p>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Daftar</h2>
                    <p className="text-sm text-gray-500 mb-6">Isi data berikut untuk membuat akun.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">NIK <span className="text-error">*</span></label>
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
                            <p className="mt-1 text-xs text-gray-400">NIK harus terdaftar di data penduduk desa.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Dusun <span className="text-error">*</span></label>
                            <select value={dusun} onChange={(e) => setDusun(e.target.value)} className="select select-bordered w-full" required>
                                <option value="">Pilih Dusun</option>
                                {dusunList.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                            {errors.dusun && <p className="mt-1 text-sm text-error">{errors.dusun}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-error">*</span></label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Minimal 6 karakter"
                                minLength={6}
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password <span className="text-error">*</span></label>
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Ulangi password"
                                required
                            />
                        </div>

                        <button type="submit" disabled={processing} className="btn btn-primary w-full">
                            {processing ? 'Memproses...' : 'Daftar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Sudah punya akun?{' '}
                        <Link href="/surat/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                            Masuk di sini
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
