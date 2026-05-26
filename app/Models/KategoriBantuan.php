<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriBantuan extends Model
{
    protected $fillable = [
        'nama_bantuan',
    ];

    public function penerimaBantuans()
    {
        return $this->hasMany(PenerimaBantuan::class);
    }
}
