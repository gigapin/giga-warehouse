<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'typology',
        'customer_id',
        'supplier_id',
        'order_number',
        'request_date',
        'closing_date',
        'status',
        'note',
    ];

    protected $casts = [
        'request_date' => 'date',
        'closing_date' => 'date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function inventoryMovements()
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
