<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    protected $fillable = [
        'nama',
        'nik',
        'nip',
        'id_jabatan',
        'nohp',
        'alamat',
        'foto',
    ];

    public function jb()
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan');
    }
}
