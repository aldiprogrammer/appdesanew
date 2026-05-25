<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    protected $fillable = [
        'nama_usaha',
        'alamat',
        'keterangan',
        'nohp',
        'foto1',
        'foto2',
        'foto3',
    ];
}
