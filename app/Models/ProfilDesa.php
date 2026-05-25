<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilDesa extends Model
{
    protected $table = 'profil_desa';

    protected $fillable = [
        'nama_desa',
        'kode_desa',
        'nama_kecamatan',
        'nama_kabupaten',
        'nama_provinsi',
        'alamat_desa',
        'kode_pos',
        'telepon',
        'email',
        'website',
        'logo',
        'foto_kantor',
        'kepala_desa',
        'sambutan',
        'visi',
        'misi',
        'sejarah',
        'luas_wilayah',
        'jumlah_penduduk',
        'latitude',
        'longitude',
        'facebook',
        'instagram',
        'youtube',
    ];

    protected $casts = [
        'jumlah_penduduk' => 'integer',
    ];
}
