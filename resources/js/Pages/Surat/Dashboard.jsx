import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSuratLoading } from '@/hooks/useSuratLoading';
import { SkeletonCard, SkeletonListItem, SkeletonProfileCard } from '@/Components/Skeleton';

const statusBadge = {
    pending: 'badge-warning',
    diproses: 'badge-info',
    selesai: 'badge-success',
    ditolak: 'badge-error',
};

const statusLabel = {
    pending: 'Menunggu',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

const jenisIcon = {
    domisili: 'fa-house-chimney',
    tidak_mampu: 'fa-hand-holding-heart',
    usaha: 'fa-store',
    belum_menikah: 'fa-ring',
    pindah: 'fa-truck-moving',
};

function SkeletonDashboard() {
    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 md:px-6">
                <SkeletonProfileCard className="mb-8" />
                <div className="h-5 w-40 rounded bg-gray-200 animate-pulse mb-4" />
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
                <div className="mt-10">
                    <div className="h-5 w-32 rounded bg-gray-200 animate-pulse mb-4" />
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => <SkeletonListItem key={i} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuratDashboard({ user, penduduk, surats, jenisList }) {
    const { flash = {} } = usePage().props;
    const loading = useSuratLoading();

    useEffect(() => {
        if (flash.success) {
            Swal.fire({ title: 'Berhasil', text: flash.success, icon: 'success', timer: 1800, showConfirmButton: false });
        }
        if (flash.error) {
            Swal.fire({ title: 'Gagal', text: flash.error, icon: 'error', buttonsStyling: false, customClass: { confirmButton: 'btn btn-error text-white' } });
        }
    }, [flash]);

    const handleLogout = () => {
        router.post('/surat/logout');
    };

    if (loading) return <SkeletonDashboard />;

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-file-lines"></i>
                        </div>
                        <span className="text-base font-bold text-gray-800 md:text-lg">Layanan Surat</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-gray-500 md:block">{user.name}</span>
                        <button onClick={handleLogout} className="btn btn-ghost btn-sm text-gray-600 hover:text-error">
                            <i className="fas fa-sign-out-alt"></i>
                            <span className="hidden md:inline">Keluar</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 md:px-6">
                {/* Profile summary */}
                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm">
                                <i className="fas fa-user text-xl"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">NIK: {user.nik} | Dusun: {user.dusun}</p>
                            </div>
                        </div>
                        <Link href="/surat/riwayat" className="btn btn-outline btn-sm">
                            <i className="fas fa-clock-rotate"></i>
                            Riwayat Surat
                        </Link>
                    </div>
                </div>

                {/* Pilih jenis surat */}
                <h3 className="text-lg font-bold text-gray-900 mb-4">Buat Surat Baru</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
                    {Object.entries(jenisList).map(([key, label]) => (
                        <Link
                            key={key}
                            href={`/surat/buat/${key}`}
                            className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm text-center transition active:scale-[0.97] hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm md:h-14 md:w-14">
                                <i className={`fas ${jenisIcon[key] || 'fa-file'} text-lg md:text-xl`}></i>
                            </div>
                            <p className="text-[11px] font-semibold text-gray-800 leading-tight md:text-sm">{label}</p>
                        </Link>
                    ))}
                </div>

                {/* Surat terbaru */}
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Surat Terbaru</h3>
                        {surats.length > 0 && (
                            <Link href="/surat/riwayat" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                                Lihat Semua
                            </Link>
                        )}
                    </div>

                    {surats.length > 0 ? (
                        <div className="space-y-3">
                            {surats.map((s) => (
                                <div key={s.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 md:h-10 md:w-10">
                                                <i className={`fas ${jenisIcon[s.jenis] || 'fa-file'} text-sm`}></i>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{jenisList[s.jenis] || s.jenis}</p>
                                                <p className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString('id-ID')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {s.status === 'selesai' && (
                                                <a href={`/surat/download/${s.id}`} className="text-emerald-600 hover:text-emerald-700" title="Download PDF">
                                                    <i className="fas fa-download"></i>
                                                </a>
                                            )}
                                            <span className={`badge text-[10px] md:text-xs ${statusBadge[s.status] || 'badge-ghost'}`}>
                                                {statusLabel[s.status] || s.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-2xl text-gray-400">
                                <i className="fas fa-file-lines"></i>
                            </div>
                            <p className="text-sm font-semibold text-gray-500">Belum ada pengajuan surat</p>
                            <p className="text-xs text-gray-400 mt-1">Pilih jenis surat di atas untuk memulai.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
