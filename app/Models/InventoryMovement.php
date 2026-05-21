<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryMovement extends Model
{
    protected $fillable = [
        'causal_id',
        'item_id',
        'inventory_movement_type',
        'parent_id',
        'order_id',
        'detail_order_id',
        'quantity',
        'reference_ddt',
        'inventory_movement_date',
        'purchase_price_cad',
        'sale_price_cad',
    ];

    protected $casts = [
        'inventory_movement_date' => 'date',
    ];

    public function causal()
    {
        return $this->belongsTo(Causal::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function parent()
    {
        return $this->belongsTo(InventoryMovement::class, 'parent_id');
    }
}
