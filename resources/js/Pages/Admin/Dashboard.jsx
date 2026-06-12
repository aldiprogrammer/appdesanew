import AdminLayout from '@/Layouts/AdminLayout'
import Chart from '@/Components/Chart'
import React from 'react'

const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
const STATUS_LABEL = { pending: 'Pending', diproses: 'Diproses', selesai: 'Selesai', ditolak: 'Ditolak' }
const JENIS_LABEL = { domisili: 'Domisili', tidak_mampu: 'Tidak Mampu', usaha: 'Usaha', belum_menikah: 'Belum Menikah', pindah: 'Pindah' }

function rupiah(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID')
}

function fmt(n) {
    return Number(n).toLocaleString('id-ID')
}

function objToArrays(obj, keyMap) {
    const keys = Object.keys(obj).sort((a, b) => {
        if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b)
        const order = ['pending', 'diproses', 'selesai', 'ditolak']
        return (order.indexOf(a) - order.indexOf(b)) || a.localeCompare(b)
    })
    const labels = keys.map((k) => (keyMap && keyMap[k]) || k)
    const data = keys.map((k) => obj[k])
    return { labels, data }
}

const cards = [
    { key: 'totalPenduduk', label: 'Total Penduduk', icon: 'fa-users', color: 'bg-blue-500' },
    { key: 'totalSurat', label: 'Total Surat', icon: 'fa-file-lines', color: 'bg-green-500' },
    { key: 'totalSuratHariIni', label: 'Surat Hari Ini', icon: 'fa-file-pen', color: 'bg-cyan-500' },
    { key: 'totalPengaduan', label: 'Total Pengaduan', icon: 'fa-bullhorn', color: 'bg-orange-500' },
    { key: 'totalPengaduanHariIni', label: 'Pengaduan Hari Ini', icon: 'fa-clock', color: 'bg-red-500' },
    { key: 'totalUmkm', label: 'Total UMKM', icon: 'fa-store', color: 'bg-purple-500' },
    { key: 'totalUser', label: 'Total User', icon: 'fa-user', color: 'bg-indigo-500' },
    { key: 'totalDusun', label: 'Total Dusun', icon: 'fa-map', color: 'bg-teal-500' },
    { key: 'totalBerita', label: 'Total Berita', icon: 'fa-newspaper', color: 'bg-sky-500' },
    { key: 'totalPegawai', label: 'Total Pegawai', icon: 'fa-users-gear', color: 'bg-slate-500' },
    { key: 'totalGallery', label: 'Total Gallery', icon: 'fa-images', color: 'bg-pink-500' },
    { key: 'sisaApbdes', label: 'Sisa APBDes', icon: 'fa-coins', color: 'bg-emerald-500', isRupiah: true },
]

export default function Dashboard({ stats, charts }) {
    const suratBulan = objToArrays(charts.suratPerBulan || {}, BULAN)
    const suratStatus = objToArrays(charts.suratPerStatus || {}, STATUS_LABEL)
    const pengaduanBulan = objToArrays(charts.pengaduanPerBulan || {}, BULAN)
    const pengaduanStatus = objToArrays(charts.pengaduanPerStatus || {}, STATUS_LABEL)
    const suratJenis = objToArrays(charts.suratPerJenis || {}, JENIS_LABEL)

    return (
        <>
            <AdminLayout>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cards.map((card) => (
                        <div key={card.key} className="card shadow-md border border-base-300">
                            <div className="card-body flex flex-row items-center gap-4 p-5">
                                <div className={`${card.color} text-white rounded-xl w-14 h-14 flex items-center justify-center text-2xl`}>
                                    <i className={`fas ${card.icon}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/60">{card.label}</p>
                                    <h3 className="text-2xl font-bold">
                                        {card.key === 'sisaApbdes'
                                            ? rupiah(stats.sisaApbdes)
                                            : fmt(stats[card.key] || 0)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                    <div className="card shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-base">
                                <i className="fas fa-chart-line text-blue-500" />
                                Surat per Bulan ({new Date().getFullYear()})
                            </h2>
                            <Chart type="line" labels={suratBulan.labels} data={suratBulan.data} label="Surat" />
                        </div>
                    </div>

                    <div className="card shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-base">
                                <i className="fas fa-chart-pie text-purple-500" />
                                Surat per Status
                            </h2>
                            <Chart type="doughnut" labels={suratStatus.labels} data={suratStatus.data} />
                        </div>
                    </div>

                    <div className="card shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-base">
                                <i className="fas fa-chart-bar text-orange-500" />
                                Pengaduan per Bulan ({new Date().getFullYear()})
                            </h2>
                            <Chart type="bar" labels={pengaduanBulan.labels} data={pengaduanBulan.data} label="Pengaduan" />
                        </div>
                    </div>

                    <div className="card shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-base">
                                <i className="fas fa-chart-pie text-red-500" />
                                Pengaduan per Status
                            </h2>
                            <Chart type="doughnut" labels={pengaduanStatus.labels} data={pengaduanStatus.data} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                    <div className="card shadow-md border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-base">
                                <i className="fas fa-chart-bar text-green-500" />
                                Surat per Jenis
                            </h2>
                            <Chart type="bar" labels={suratJenis.labels} data={suratJenis.data} label="Surat" />
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
