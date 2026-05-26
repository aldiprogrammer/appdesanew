<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApbdesBelanja extends Model
{
    protected $fillable = [
        'apbdes_id',
        'kegiatan',
        'kategori',
        'jumlah',
        'lokasi',
        'keterangan',
    ];

    protected function casts(): array
    {
        return [
            'jumlah' => 'decimal:2',
        ];
    }

    public function apbdes()
    {
        return $this->belongsTo(Apbdes::class, 'apbdes_id');
    }
}
