<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'stock_beginning_year',
        'progressive_annual_inbound',
        'progressive_annual_outbound',
        'safety_stock',
        'available_stock',
    ];

    public function scopeBelowSafetyStock(Builder $query): Builder
    {
        return $query->whereColumn('available_stock', '<', 'safety_stock');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'items_supplier');
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function inventoryMovements()
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
