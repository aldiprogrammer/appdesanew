<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PendudukNews extends Model
{
    protected $table = 'penduduk_news';
    protected $guarded = [];
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $incrementing = true;
}
