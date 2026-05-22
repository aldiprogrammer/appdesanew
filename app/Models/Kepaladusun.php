<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kepaladusun extends Model
{
    protected $fillable = [
        'nama',
        'nik',
        'foto',
        'dusun',
        'id_dusun',
        'tahun_kerja',
        'tahun_akhir_kerja',
    ];
}
