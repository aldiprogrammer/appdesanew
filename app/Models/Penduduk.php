<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penduduk extends Model
{
    protected $table = 'penduduk_news';
    protected $guarded = [];

    const AGAMA_MAP = [
        '1' => 'Islam',
        '2' => 'Kristen',
        '3' => 'Katolik',
        '4' => 'Hindu',
        '5' => 'Budha',
        '6' => 'Konghucu',
        '7' => 'Kepercayaan',
    ];

    const PEKERJAAN_MAP = [
        '1'  => 'Belum/Tidak Bekerja',
        '2'  => 'Pelajar/Mahasiswa',
        '3'  => 'Petani',
        '4'  => 'Pedagang',
        '5'  => 'PNS/TNI/Polri',
        '6'  => 'Wiraswasta',
        '7'  => 'Buruh',
        '8'  => 'Sopir',
        '9'  => 'Nelayan',
        '15' => 'Perangkat Desa',
        '16' => 'Guru',
        '18' => 'Dokter',
        '19' => 'Perawat/Bidan',
        '20' => 'Seniman',
        '23' => 'Pengacara',
        '26' => 'Karyawan Swasta',
        '35' => 'Tukang',
        '65' => 'Peternak',
        '72' => 'Penjahit',
        '74' => 'Montir',
        '81' => 'PRT',
        '88' => 'Ibu Rumah Tangga',
    ];
}
