<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Causal extends Model
{
    protected $fillable = ['code', 'description', 'typology'];

    public function inventoryMovements()
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
