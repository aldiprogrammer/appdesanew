<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KontakLayanan extends Model
{
    protected $table = 'kontak_layanans';

    protected $fillable = [
        'nama_layanan',
        'icon_class',
        'nomor',
        'icon_image',
    ];
}
