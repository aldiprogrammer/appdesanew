<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $fillable = [
        'judul',
        'keterangan',
        'tanggal_posting',
        'status',
        'foto',
    ];

    protected $casts = [
        'tanggal_posting' => 'date',
        'status' => 'integer',
    ];
}
