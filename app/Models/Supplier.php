<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
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
