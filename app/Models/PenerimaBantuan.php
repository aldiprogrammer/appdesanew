<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PenerimaBantuan extends Model
{
    protected $fillable = [
        'nik',
        'nama',
        'dusun_id',
        'kategori_bantuan_id',
        'keterangan',
    ];

    public function dusun()
    {
        return $this->belongsTo(Dusun::class);
    }

    public function kategoriBantuan()
    {
        return $this->belongsTo(KategoriBantuan::class);
    }
}
