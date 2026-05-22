<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'company_name',
        'vat_number',
        'fiscal_code',
        'municipality_id',
        'address',
        'sdi_code',
        'pec',
        'email',
        'phone',
    ];

    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
