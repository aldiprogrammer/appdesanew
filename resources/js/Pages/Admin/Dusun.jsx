import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const defaultLocation = {
    latitude: -6.2,
    longitude: 106.816666,
};

const centerMarkerIcon = L.divIcon({
    className: '',
    html: `
        <div style="
            width: 28px;
            height: 28px;
            background: #16a34a;
            border: 3px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);
            transform: rotate(-45deg);
        ">
            <div style="
                width: 8px;
                height: 8px;
                margin: 7px;
                background: #ffffff;
                border-radius: 9999px;
            "></div>
        </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
});

const polygonMarkerIcon = L.divIcon({
    className: '',
    html: `
        <div style="
            width: 16px;
            height: 16px;
            background: #22c55e;
            border: 3px solid #ffffff;
            border-radius: 9999px;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
        "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

const normalizePolygon = (polygon) => {
    if (!polygon) {
        return [];
    }

    let parsedPolygon = polygon;

    if (typeof polygon === 'string') {
        try {
            parsedPolygon = JSON.parse(polygon || '[]');
        } catch {
            parsedPolygon = [];
        }
    }

    if (!Array.isArray(parsedPolygon)) {
        return [];
    }

    return parsedPolygon
        .map((point) => {
            if (Array.isArray(point)) {
                return {
                    lat: Number(point[0]),
                    lng: Number(point[1]),
                };
            }

            return {
                lat: Number(point.lat),
                lng: Number(point.lng),
            };
        })
        .filter((point) => !Number.isNaN(point.lat) && !Number.isNaN(point.lng));
};

const formatCoordinate = (value) => {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
        return value;
    }

    return numberValue.toFixed(6);
};

const calculatePolygonArea = (polygon) => {
    const points = normalizePolygon(polygon);

    if (points.length < 3) {
        return 0;
    }

    const earthRadius = 6378137;
    const area = points.reduce((total, point, index) => {
        const nextPoint = points[(index + 1) % points.length];
        const currentLat = (point.lat * Math.PI) / 180;
        const nextLat = (nextPoint.lat * Math.PI) / 180;
        const longitudeDiff = ((nextPoint.lng - point.lng) * Math.PI) / 180;

        return total + longitudeDiff * (2 + Math.sin(currentLat) + Math.sin(nextLat));
    }, 0);

    return Math.abs((area * earthRadius * earthRadius) / 2);
};

const formatArea = (area) => {
    const numberArea = Number(area);

    if (!numberArea || Number.isNaN(numberArea)) {
        return '-';
    }

    if (numberArea >= 10000) {
        return `${(numberArea / 10000).toLocaleString('id-ID', {
            maximumFractionDigits: 2,
        })} ha`;
    }

    return `${numberArea.toLocaleString('id-ID', {
        maximumFractionDigits: 2,
    })} m2`;
};

export default function Dusun({ dusun = [] }) {
    const { flash = {}, errors = {} } = usePage().props;
    const firstLocation = useMemo(() => {
        const firstDusun = dusun.find((item) => item.latitude && item.longitude);

        if (!firstDusun) {
            return defaultLocation;
        }

        return {
            latitude: Number(firstDusun.latitude),
            longitude: Number(firstDusun.longitude),
        };
    }, [dusun]);

    const [form, setForm] = useState({
        nama_dusun: '',
        latitude: firstLocation.latitude,
        longitude: firstLocation.longitude,
        polygon: [],
        status: 1,
    });
    const [editingId, setEditingId] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [polygonMode, setPolygonMode] = useState(false);
    const polygonArea = useMemo(() => calculatePolygonArea(form.polygon), [form.polygon]);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const polygonModeRef = useRef(false);
    const polygonPointsRef = useRef([]);
    const polygonLayerRef = useRef(null);
    const polygonLineRef = useRef(null);
    const vertexMarkersRef = useRef([]);

    const clearPolygonLayers = () => {
        if (polygonLayerRef.current) {
            polygonLayerRef.current.remove();
            polygonLayerRef.current = null;
        }

        if (polygonLineRef.current) {
            polygonLineRef.current.remove();
            polygonLineRef.current = null;
        }

        vertexMarkersRef.current.forEach((marker) => marker.remove());
        vertexMarkersRef.current = [];
    };

    const drawPolygon = (points) => {
        if (!mapRef.current) {
            return;
        }

        clearPolygonLayers();

        const latLngs = points.map((point) => [point.lat, point.lng]);

        if (latLngs.length >= 3) {
            polygonLayerRef.current = L.polygon(latLngs, {
                color: '#16a34a',
                fillColor: '#22c55e',
                fillOpacity: 0.22,
                weight: 3,
            }).addTo(mapRef.current);
        } else if (latLngs.length >= 2) {
            polygonLineRef.current = L.polyline(latLngs, {
                color: '#16a34a',
                dashArray: '8 6',
                weight: 3,
            }).addTo(mapRef.current);
        }

        vertexMarkersRef.current = points.map((point, index) => {
            const marker = L.marker([point.lat, point.lng], {
                draggable: true,
                icon: polygonMarkerIcon,
                title: `Titik batas ${index + 1}`,
            }).addTo(mapRef.current);

            marker.on('dragend', (event) => {
                const position = event.target.getLatLng();
                const nextPoints = [...polygonPointsRef.current];
                nextPoints[index] = {
                    lat: position.lat,
                    lng: position.lng,
                };
                updatePolygon(nextPoints);
            });

            return marker;
        });
    };

    const updatePolygon = (points, shouldFitBounds = false) => {
        const nextPoints = normalizePolygon(points);

        polygonPointsRef.current = nextPoints;
        setForm((current) => ({
            ...current,
            polygon: nextPoints,
        }));
        drawPolygon(nextPoints);

        if (mapRef.current && shouldFitBounds && nextPoints.length > 0) {
            const bounds = L.latLngBounds(nextPoints.map((point) => [point.lat, point.lng]));
            mapRef.current.fitBounds(bounds, {
                padding: [36, 36],
                maxZoom: 16,
            });
        }
    };

    const addPolygonPoint = (latitude, longitude) => {
        updatePolygon([
            ...polygonPointsRef.current,
            {
                lat: Number(latitude),
                lng: Number(longitude),
            },
        ]);
    };

    const updateLocation = (latitude, longitude, shouldFly = false) => {
        const nextLatitude = Number(latitude);
        const nextLongitude = Number(longitude);

        setForm((current) => ({
            ...current,
            latitude: nextLatitude,
            longitude: nextLongitude,
        }));

        if (markerRef.current) {
            markerRef.current.setLatLng([nextLatitude, nextLongitude]);
        }

        if (mapRef.current && shouldFly) {
            mapRef.current.flyTo([nextLatitude, nextLongitude], 15);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({
            nama_dusun: '',
            latitude: firstLocation.latitude,
            longitude: firstLocation.longitude,
            polygon: [],
            status: 1,
        });
        updateLocation(firstLocation.latitude, firstLocation.longitude, true);
        updatePolygon([]);
        setPolygonMode(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: name === 'status' ? Number(value) : value,
        }));
    };

    const handleCoordinateChange = (event) => {
        const { name, value } = event.target;
        const numberValue = Number(value);

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        if (!Number.isNaN(numberValue)) {
            const latitude = name === 'latitude' ? numberValue : Number(form.latitude);
            const longitude = name === 'longitude' ? numberValue : Number(form.longitude);

            if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
                updateLocation(latitude, longitude, true);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.polygon.length > 0 && form.polygon.length < 3) {
            Swal.fire({
                title: 'Polygon belum lengkap',
                text: 'Minimal tambahkan 3 titik untuk membentuk batas wilayah.',
                icon: 'warning',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-warning text-white',
                },
            });
            return;
        }

        setProcessing(true);

        const options = {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => resetForm(),
        };

        if (editingId) {
            router.put(`/admin/dusun/${editingId}`, form, options);
            return;
        }

        router.post('/admin/dusun', form, options);
    };

    const handleEdit = (item) => {
        const itemPolygon = normalizePolygon(item.polygon);

        setEditingId(item.id);
        setForm({
            nama_dusun: item.nama_dusun,
            latitude: item.latitude,
            longitude: item.longitude,
            polygon: itemPolygon,
            status: Number(item.status ?? 1),
        });
        updateLocation(item.latitude, item.longitude, true);
        updatePolygon(itemPolygon, itemPolygon.length > 0);
        setPolygonMode(itemPolygon.length === 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Hapus data dusun?',
            text: `Data "${item.nama_dusun}" akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                actions: 'flex gap-3',
                confirmButton: 'btn btn-error text-white',
                cancelButton: 'btn btn-neutral text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/dusun/${item.id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const removeLastPolygonPoint = () => {
        updatePolygon(polygonPointsRef.current.slice(0, -1));
    };

    useEffect(() => {
        polygonModeRef.current = polygonMode;
    }, [polygonMode]);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        const map = L.map(mapContainerRef.current).setView(
            [firstLocation.latitude, firstLocation.longitude],
            13,
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const marker = L.marker([firstLocation.latitude, firstLocation.longitude], {
            draggable: true,
            icon: centerMarkerIcon,
            title: 'Titik tengah dusun',
        }).addTo(map);

        marker.on('dragend', (event) => {
            const position = event.target.getLatLng();
            updateLocation(position.lat, position.lng);
        });

        map.on('click', (event) => {
            if (polygonModeRef.current) {
                addPolygonPoint(event.latlng.lat, event.latlng.lng);
                return;
            }

            updateLocation(event.latlng.lat, event.latlng.lng);
        });

        mapRef.current = map;
        markerRef.current = marker;
        drawPolygon(polygonPointsRef.current);

        return () => {
            clearPolygonLayers();
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, [firstLocation.latitude, firstLocation.longitude]);

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: 'Berhasil',
                text: flash.success,
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
            });
        }

        if (flash.error) {
            Swal.fire({
                title: 'Gagal',
                text: flash.error,
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-error text-white',
                },
            });
        }
    }, [flash.error, flash.success]);

    return (
        <AdminLayout>
            <Head title="Data Dusun" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Data Dusun</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola nama dusun, titik tengah, dan batas wilayah.
                    </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-lg border border-base-300 bg-base-100 p-5 shadow-sm"
                    >
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingId ? 'Edit Dusun' : 'Tambah Dusun'}
                            </h3>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Batal
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Nama Dusun</span>
                                <input
                                    type="text"
                                    name="nama_dusun"
                                    value={form.nama_dusun}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="Masukkan nama dusun"
                                />
                                {errors.nama_dusun && (
                                    <span className="mt-1 text-sm text-error">
                                        {errors.nama_dusun}
                                    </span>
                                )}
                            </label>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                                <label className="form-control w-full">
                                    <span className="label-text mb-2 font-medium">Latitude</span>
                                    <input
                                        type="number"
                                        step="any"
                                        name="latitude"
                                        value={form.latitude}
                                        onChange={handleCoordinateChange}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.latitude && (
                                        <span className="mt-1 text-sm text-error">
                                            {errors.latitude}
                                        </span>
                                    )}
                                </label>

                                <label className="form-control w-full">
                                    <span className="label-text mb-2 font-medium">Longitude</span>
                                    <input
                                        type="number"
                                        step="any"
                                        name="longitude"
                                        value={form.longitude}
                                        onChange={handleCoordinateChange}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.longitude && (
                                        <span className="mt-1 text-sm text-error">
                                            {errors.longitude}
                                        </span>
                                    )}
                                </label>
                            </div>

                            <div className="rounded-lg border border-base-300 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className='text-xs'>
                                        <p className="font-medium text-gray-900">Batas Polygon</p>
                                        <p className="text-sm text-gray-500">
                                            {form.polygon.length} titik batas
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Luas</p>
                                        <p className="font-semibold text-primary text-xs">
                                            {formatArea(polygonArea)}
                                        </p>
                                    </div>
                                    <div className="join">
                                        <button
                                            type="button"
                                            onClick={() => setPolygonMode(false)}
                                            className={`btn join-item btn-sm ${!polygonMode ? 'btn-success' : 'btn-ghost'
                                                }`}
                                        >
                                            Titik Tengah
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPolygonMode(true)}
                                            className={`btn join-item btn-sm ${polygonMode ? 'btn-success' : 'btn-ghost'
                                                }`}
                                        >
                                            Polygon
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                    Pilih mode Polygon, lalu klik peta minimal 3 titik untuk
                                    membuat batas wilayah. Titik batas dapat digeser.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={removeLastPolygonPoint}
                                        disabled={form.polygon.length === 0}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Hapus Titik Terakhir
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updatePolygon([])}
                                        disabled={form.polygon.length === 0}
                                        className="btn btn-outline btn-error btn-sm"
                                    >
                                        Reset Polygon
                                    </button>
                                </div>

                                {errors.polygon && (
                                    <span className="mt-2 block text-sm text-error">
                                        {errors.polygon}
                                    </span>
                                )}
                            </div>

                            <label className="form-control w-full">
                                <span className="label-text mb-2 font-medium">Status</span>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                >
                                    <option value={1}>Aktif</option>
                                    <option value={0}>Tidak aktif</option>
                                </select>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-success w-full"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : editingId
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Data'}
                            </button>
                        </div>
                    </form>

                    <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 p-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">Peta Wilayah</h3>
                                <p className="text-sm text-gray-500">
                                    Mode aktif: {polygonMode ? 'Polygon batas wilayah' : 'Titik tengah dusun'}
                                </p>
                            </div>
                            <span className="badge badge-success">
                                {form.polygon.length >= 3 ? 'Polygon siap' : 'Belum ada polygon'}
                            </span>
                        </div>
                        <div
                            ref={mapContainerRef}
                            className="h-[520px] min-h-[360px] w-full"
                        />
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Dusun</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Titik Batas</th>
                                    <th>Luas</th>
                                    <th>Status</th>
                                    <th className="text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dusun.length > 0 ? (
                                    dusun.map((item, index) => {
                                        const itemPolygon = normalizePolygon(item.polygon);

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td className="font-medium">{item.nama_dusun}</td>
                                                <td>{formatCoordinate(item.latitude)}</td>
                                                <td>{formatCoordinate(item.longitude)}</td>
                                                <td>{itemPolygon.length}</td>
                                                <td>
                                                    {formatArea(
                                                        item.luas_wilayah ??
                                                        calculatePolygonArea(itemPolygon),
                                                    )}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${Number(item.status) === 1
                                                            ? 'badge-success'
                                                            : 'badge-ghost'
                                                            }`}
                                                    >
                                                        {Number(item.status) === 1
                                                            ? 'Aktif'
                                                            : 'Tidak aktif'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEdit(item)}
                                                            className="btn btn-warning btn-sm"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(item)}
                                                            className="btn btn-error btn-sm text-white"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="py-8 text-center text-gray-500">
                                            Belum ada data dusun.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
