import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

export default function AdminLayout({ children }) {
    // const { auth } = usePage().props
    // const role = auth?.user?.role

    // const getInitial = (name) => {
    //     return name?.charAt(0).toUpperCase() || 'U'
    // }

    // const handleLogout = () => {
    //     router.post(route('logout'))
    // }

    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-100 border-b border-base-300 px-4 shadow-sm">
                    <div className="flex-none lg:hidden">
                        <label for="sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 stroke-current"
                                fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-primaryGreen">Dashboard Admin</h1>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-sm badge-success indicator-item">3</span>
                            </div>
                        </button>

                        <div className="dropdown dropdown-end">
                            <div tabindex="0" role="button" className="btn btn-ghost flex items-center gap-2">
                                <div className="avatar placeholder">
                                    <div className="bg-primaryGreen text-white rounded-full w-10">
                                        <span>Admin</span>
                                    </div>
                                </div>
                                <span className="hidden md:block font-medium">Admin</span>
                            </div>

                            <ul tabindex="0"
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link>Profile</Link>
                                </li>
                                <li>
                                    <button className="text-error w-full text-left">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <main className="p-6">{children}</main>
            </div>

            <div className="drawer-side z-50">
                <label for="sidebar" className="drawer-overlay"></label>

                <aside className="w-72 min-h-full bg-base-100 border-r border-base-300">
                    <div className="p-6 border-b border-base-300">
                        <h2 className="text-2xl font-bold text-primaryGreen">APPDes</h2>
                        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
                    </div>

                    <ul className="menu p-4 text-base-content w-full gap-1">
                        <li>
                            <Link href="/admin/dashboard" className="rounded-xl">
                                <i className="fas fa-home"></i>
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/dusun" className="rounded-xl">
                                <i className="fas fa-book"></i>
                                Data Dusun
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/kepaladusun" className="rounded-xl">
                                <i className="fas fa-user-tie"></i>
                                Kepala Dusun
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/jabatan" className="rounded-xl">
                                <i className="fas fa-list"></i>
                                Jabatan
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/berita" className="rounded-xl">
                                <i className="fas fa-newspaper"></i>
                                Berita
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/gallery" className="rounded-xl">
                                <i className="fas fa-image"></i>
                                Galeri
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/profil-desa" className="rounded-xl">
                                <i className="fas fa-city"></i>
                                Profil Desa
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/umkm" className="rounded-xl">
                                <i className="fas fa-store"></i>
                                UMKM
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/kontak-layanan" className="rounded-xl">
                                <i className="fas fa-phone"></i>
                                Kontak Layanan
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/pegawai" className="rounded-xl">
                                <i className="fas fa-users"></i>
                                Pegawai
                            </Link>
                        </li>

                    </ul>
                </aside>
            </div>
        </div>
    )
}
