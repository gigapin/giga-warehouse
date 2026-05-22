<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
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
        'service',
        'punctuality',
        'quality',
        'prices',
        'assistance',
    ];

    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'items_supplier');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
