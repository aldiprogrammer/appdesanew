import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSuratLoading } from '@/hooks/useSuratLoading';
import { SkeletonListItem } from '@/Components/Skeleton';

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

function SkeletonRiwayat() {
    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            <div className="mx-auto max-w-4xl px-4 pt-20 pb-10 md:px-6">
                <div className="h-4 w-32 rounded bg-gray-200 animate-pulse mb-6" />
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 md:p-8">
                        <div className="h-6 w-48 rounded bg-gray-200 animate-pulse" />
                        <div className="h-3 w-64 rounded bg-gray-200 animate-pulse mt-2" />
                    </div>
                    <div className="divide-y divide-gray-50">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="p-5 md:p-6"><SkeletonListItem /></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuratRiwayat({ surats, jenisList }) {
    const { flash = {} } = usePage().props;
    const loading = useSuratLoading();

    useEffect(() => {
        if (flash.success) {
            Swal.fire({ title: 'Berhasil', text: flash.success, icon: 'success', timer: 1800, showConfirmButton: false });
        }
    }, [flash]);

    if (loading) return <SkeletonRiwayat />;

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm text-white shadow-sm">
                            <i className="fas fa-file-lines"></i>
                        </div>
                        <span className="text-base font-bold text-gray-800 md:text-lg">Riwayat Surat</span>
                    </div>
                    <Link href="/surat/dashboard" className="btn btn-ghost btn-sm text-gray-600">
                        <i className="fas fa-arrow-left"></i>
                        <span className="hidden md:inline ml-1">Dashboard</span>
                    </Link>
                </div>
            </nav>

            <div className="mx-auto max-w-4xl px-4 pt-20 pb-10 md:px-6">
                <Link href="/surat/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-6">
                    <i className="fas fa-arrow-left"></i>
                    Kembali ke Dashboard
                </Link>

                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 md:p-8">
                        <h1 className="text-xl font-bold text-gray-900">Riwayat Pengajuan Surat</h1>
                        <p className="text-sm text-gray-500 mt-1">Semua surat yang pernah Anda ajukan.</p>
                    </div>

                    {surats.data.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {surats.data.map((s) => (
                                <div key={s.id} className="p-5 md:p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                                <i className={`fas ${jenisIcon[s.jenis] || 'fa-file'}`}></i>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900">{jenisList[s.jenis] || s.jenis}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    Diajukan: {new Date(s.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                                {s.keterangan && (
                                                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 rounded-lg p-2">
                                                        <span className="font-medium">Catatan:</span> {s.keterangan}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {s.status === 'selesai' && (
                                                <a href={`/surat/download/${s.id}`} className="btn btn-ghost btn-xs text-emerald-600 hover:bg-emerald-50" title="Download PDF">
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
                        <div className="p-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-3xl text-gray-400">
                                <i className="fas fa-file-lines"></i>
                            </div>
                            <p className="text-sm font-semibold text-gray-500">Belum ada pengajuan surat</p>
                            <Link href="/surat/dashboard" className="btn btn-primary btn-sm mt-4">Buat Surat Baru</Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {surats.links && surats.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <span className="text-sm text-gray-500">
                                Menampilkan {surats.from}–{surats.to} dari {surats.total}
                            </span>
                            <div className="join">
                                {surats.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`join-item btn btn-sm ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState preserveScroll
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
