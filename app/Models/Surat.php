<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Surat extends Model
{
    protected $fillable = [
        'user_id',
        'jenis',
        'data',
        'status',
        'keterangan',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function jenisList(): array
    {
        return [
            'domisili'       => 'Surat Keterangan Domisili',
            'tidak_mampu'    => 'Surat Keterangan Tidak Mampu',
            'usaha'          => 'Surat Keterangan Usaha',
            'belum_menikah'  => 'Surat Keterangan Belum Menikah',
            'pindah'         => 'Surat Keterangan Pindah',
        ];
    }
}
