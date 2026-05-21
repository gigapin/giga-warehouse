<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'item_id',
        'delivery_date',
        'qta_ordered',
        'qta_delivered',
        'delivered',
        'note',
    ];

    protected $casts = [
        'delivery_date' => 'date',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
