import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const defaultLocation = {
    latitude: -6.2,
    longitude: 106.816666,
};

const centerMarkerIcon = L.divIcon({
    className: '',
    html: `
        <div style="width: 26px; height: 26px; background: #16a34a; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);"></div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
});

const normalizePolygon = (polygon) => {
    if (!polygon) {
        return [];
    }

    if (typeof polygon === 'string') {
        try {
            polygon = JSON.parse(polygon || '[]');
        } catch {
            return [];
        }
    }

    if (!Array.isArray(polygon)) {
        return [];
    }

    return polygon
        .map((point) => {
            if (Array.isArray(point)) {
                return { lat: Number(point[0]), lng: Number(point[1]) };
            }

            return { lat: Number(point.lat), lng: Number(point.lng) };
        })
        .filter((point) => !Number.isNaN(point.lat) && !Number.isNaN(point.lng));
};

const formatCoordinate = (value) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
        return '-';
    }
    return numberValue.toFixed(6);
};

export default function PetaDesa({ profil = null, dusun = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const featureLayerRef = useRef(null);

    const filteredDusun = useMemo(() => {
        const trimmed = searchTerm.trim().toLowerCase();
        if (!trimmed) {
            return dusun;
        }

        return dusun.filter((item) =>
            item.nama_dusun?.toLowerCase().includes(trimmed),
        );
    }, [dusun, searchTerm]);

    const firstLocation = useMemo(() => {
        const firstDusun = filteredDusun.find((item) => item.latitude && item.longitude);
        if (!firstDusun) {
            return defaultLocation;
        }

        return {
            latitude: Number(firstDusun.latitude),
            longitude: Number(firstDusun.longitude),
        };
    }, [dusun]);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        const map = L.map(mapContainerRef.current).setView(
            [firstLocation.latitude, firstLocation.longitude],
            12,
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        featureLayerRef.current = L.layerGroup().addTo(map);
        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
            featureLayerRef.current = null;
        };
    }, [firstLocation.latitude, firstLocation.longitude]);

    useEffect(() => {
        if (!mapRef.current || !featureLayerRef.current) {
            return;
        }

        featureLayerRef.current.clearLayers();

        const bounds = [];

        filteredDusun.forEach((item) => {
            const lat = Number(item.latitude);
            const lng = Number(item.longitude);
            const polygon = normalizePolygon(item.polygon);

            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                return;
            }

            const marker = L.marker([lat, lng], {
                icon: centerMarkerIcon,
                title: item.nama_dusun,
            }).addTo(featureLayerRef.current);

            marker.bindPopup(`
                <div style="min-width: 180px;">
                    <strong>${item.nama_dusun}</strong><br />
                    Lat: ${formatCoordinate(lat)}<br />
                    Lng: ${formatCoordinate(lng)}
                </div>
            `);

            bounds.push([lat, lng]);

            if (polygon.length >= 3) {
                const polygonLayer = L.polygon(
                    polygon.map((point) => [point.lat, point.lng]),
                    {
                        color: '#16a34a',
                        fillColor: '#22c55e',
                        fillOpacity: 0.18,
                        weight: 3,
                    },
                ).addTo(featureLayerRef.current);

                polygonLayer.bindPopup(`
                    <div style="min-width: 180px;">
                        <strong>${item.nama_dusun}</strong><br />
                        Titik batas: ${polygon.length}
                    </div>
                `);

                polygon.forEach((point) => bounds.push([point.lat, point.lng]));
            }
        });

        if (bounds.length > 0) {
            mapRef.current.fitBounds(bounds, {
                padding: [32, 32],
                maxZoom: 15,
            });
        }
    }, [dusun]);

    const totalDusun = dusun.length;
    const totalPolygons = dusun.filter((item) => normalizePolygon(item.polygon).length >= 3).length;

    return (
        <AdminLayout>
            <Head title="Peta Desa" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Peta Desa</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Tampilan peta desa dengan nama dusun, titik pusat, dan batas polygon.
                    </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
                    <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                        <div className="border-b border-base-300 p-4 space-y-3">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Peta Desa</h3>
                                    <p className="text-sm text-gray-500">Klik marker untuk melihat nama dusun dan koordinat.</p>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                        placeholder="Cari nama dusun..."
                                        className="input input-bordered w-full sm:w-72"
                                    />
                                </div>
                            </div>
                            {searchTerm && (
                                <div className="text-sm text-gray-500">
                                    Menampilkan {filteredDusun.length} dari {dusun.length} dusun yang cocok.
                                </div>
                            )}
                        </div>
                        <div ref={mapContainerRef} className="h-[620px] min-h-[420px] w-full" />
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-lg border border-base-300 bg-base-100 p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Profil Desa</h3>
                            <div className="mt-3 space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium text-gray-900">Nama Desa:</span>{' '}
                                    {profil?.nama_desa ?? 'Belum tersedia'}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-900">Kode Desa:</span>{' '}
                                    {profil?.kode_desa ?? '-'}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-900">Alamat:</span>{' '}
                                    {profil?.alamat_desa ?? '-'}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-900">Kepala Desa:</span>{' '}
                                    {profil?.kepala_desa ?? '-'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border border-base-300 bg-base-100 p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Statistik</h3>
                            <div className="mt-4 grid gap-3">
                                <div className="rounded-lg border border-base-200 bg-white p-4">
                                    <div className="text-sm text-gray-500">Jumlah Dusun</div>
                                    <div className="mt-2 text-2xl font-semibold text-gray-900">{totalDusun}</div>
                                </div>

                                <div className="rounded-lg border border-base-200 bg-white p-4">
                                    <div className="text-sm text-gray-500">Dusun dengan Polygon</div>
                                    <div className="mt-2 text-2xl font-semibold text-gray-900">{totalPolygons}</div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-base-300 bg-base-100 p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">List Dusun</h3>
                            <div className="mt-3 space-y-3 text-sm text-gray-700">
                                {dusun.length > 0 ? (
                                    dusun.map((item) => (
                                        <div key={item.id} className="rounded-lg border border-base-200 bg-white p-3">
                                            <div className="font-semibold text-gray-900">{item.nama_dusun}</div>
                                            <div className="text-xs text-gray-500">
                                                Lat: {formatCoordinate(item.latitude)}, Lng: {formatCoordinate(item.longitude)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Batas: {normalizePolygon(item.polygon).length} titik
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500">Belum ada data dusun.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
