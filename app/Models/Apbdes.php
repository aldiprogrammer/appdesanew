<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apbdes extends Model
{
    protected $table = 'apbdes';

    protected $fillable = [
        'tahun',
        'total_pendapatan',
        'total_belanja',
        'keterangan',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'tahun' => 'integer',
            'total_pendapatan' => 'decimal:2',
            'total_belanja' => 'decimal:2',
        ];
    }

    public function pendapatans()
    {
        return $this->hasMany(ApbdesPendapatan::class, 'apbdes_id');
    }

    public function belanjas()
    {
        return $this->hasMany(ApbdesBelanja::class, 'apbdes_id');
    }

    public function sisaAnggaran(): float
    {
        return $this->total_pendapatan - $this->total_belanja;
    }
}
