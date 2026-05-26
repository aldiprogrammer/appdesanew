<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stanting extends Model
{
    protected $fillable = [
        'nik',
        'nama',
        'dusun_id',
    ];

    public function dusun()
    {
        return $this->belongsTo(Dusun::class);
    }
}
