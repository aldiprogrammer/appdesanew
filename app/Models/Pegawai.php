<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{



    public function jb()
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan');
    }
}
