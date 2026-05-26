-- ============================================================
-- APBDes — Anggaran Pendapatan dan Belanja Desa
-- Database Design (MySQL)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tabel Utama APBDes (tahun anggaran)
-- ------------------------------------------------------------
CREATE TABLE apbdes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tahun YEAR NOT NULL,
    total_pendapatan DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    total_belanja DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    keterangan TEXT NULL,
    status ENUM('draft', 'disetujui', 'ditolak', 'realisasi') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY apbdes_tahun_unique (tahun)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Tabel Pendapatan APBDes
-- ------------------------------------------------------------
CREATE TABLE apbdes_pendapatans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    apbdes_id BIGINT UNSIGNED NOT NULL,
    sumber_pendapatan VARCHAR(255) NOT NULL,
    jumlah DECIMAL(15,2) NOT NULL,
    keterangan TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_pendapatan_apbdes FOREIGN KEY (apbdes_id) REFERENCES apbdes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Tabel Belanja APBDes
-- ------------------------------------------------------------
CREATE TABLE apbdes_belanjas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    apbdes_id BIGINT UNSIGNED NOT NULL,
    kegiatan VARCHAR(255) NOT NULL,
    kategori VARCHAR(255) NOT NULL,
    jumlah DECIMAL(15,2) NOT NULL,
    lokasi VARCHAR(255) DEFAULT NULL,
    keterangan TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_belanja_apbdes FOREIGN KEY (apbdes_id) REFERENCES apbdes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DATA DUMMY
-- ============================================================

-- APBDes 2025
INSERT INTO apbdes (tahun, total_pendapatan, total_belanja, keterangan, status, created_at, updated_at)
VALUES (2025, 1850000000.00, 1750000000.00, 'APBDes Tahun Anggaran 2025', 'realisasi', NOW(), NOW());

-- Pendapatan
INSERT INTO apbdes_pendapatans (apbdes_id, sumber_pendapatan, jumlah, keterangan) VALUES
(1, 'Dana Desa (DD)',           850000000.00, 'DD dari APBN'),
(1, 'Alokasi Dana Desa (ADD)',  400000000.00, 'ADD dari APBD Kabupaten'),
(1, 'Pajak Desa',                85000000.00, 'Pajak Bumi dan Bangunan'),
(1, 'BUMDes',                   265000000.00, 'Hasil usaha BUMDes'),
(1, 'Hasil Kekayaan Desa',      120000000.00, 'Tanah kas desa dan sebagainya'),
(1, 'Lain-lain Pendapatan',     130000000.00, 'Hibah, bantuan, dan lain-lain');

-- Belanja
INSERT INTO apbdes_belanjas (apbdes_id, kegiatan, kategori, jumlah, lokasi, keterangan) VALUES
(1, 'Pembangunan Jalan Desa',        'Pembangunan',   350000000.00, 'RW 01 - RW 04',   'Hotmix sepanjang 2 km'),
(1, 'Gaji Perangkat Desa',           'Operasional',   420000000.00, '-',               '12 perangkat desa'),
(1, 'Operasional Posyandu',          'Pemberdayaan',   95000000.00, '6 posyandu',      'Vitamin, PMT, alat kesehatan'),
(1, 'Pembangunan Drainase',          'Pembangunan',   180000000.00, 'Dusun Krajan',    'Saluran air 1.2 km'),
(1, 'Bantuan Langsung Tunai (BLT)',  'Sosial',        300000000.00, '50 KPM',          'BLT DD untuk 50 keluarga'),
(1, 'Kegiatan PKK & Karang Taruna',  'Pemberdayaan',   75000000.00, 'Balai Desa',      'Pelatihan dan lomba'),
(1, 'Penyediaan Air Bersih',         'Pembangunan',   120000000.00, 'Dusun Cikadu',    'Sumur bor + pipanisasi'),
(1, 'Operasional Kantor Desa',       'Operasional',   210000000.00, 'Kantor Desa',     'ATK, listrik, internet, perawatan');

-- ============================================================
-- ALUR SISTEM
-- ============================================================
-- 1. Pemerintah desa menyusun RAPBDes → disimpan dengan status "draft"
-- 2. Pendapatan dan belanja diinput ke tabel masing-masing.
--    total_pendapatan / total_belanja di tabel apbdes dapat dihitung
--    otomatis dari SUM jumlah anak tabel.
-- 3. RAPBDes diajukan ke BPD → status "disetujui" atau "ditolak"
-- 4. Setelah disetujui, desa menjalankan anggaran → status "realisasi"
-- 5. Sisa anggaran = total_pendapatan - total_belanja
-- ============================================================
