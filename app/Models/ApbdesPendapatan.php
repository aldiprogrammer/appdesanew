<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApbdesPendapatan extends Model
{
    protected $fillable = [
        'apbdes_id',
        'sumber_pendapatan',
        'jumlah',
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
