<?php

namespace App\Services;

use App\Models\Order;

class OrderNumberGenerator
{
    public function generate(string $typology): string
    {
        $year   = now()->year;
        $prefix = $year . '/';

        $last = Order::where('typology', $typology)
            ->where('order_number', 'like', $prefix . '%')
            ->lockForUpdate()
            ->orderByDesc('order_number')
            ->value('order_number');

        $seq = $last ? ((int) substr($last, 5)) + 1 : 1;

        return $prefix . str_pad($seq, 4, '0', STR_PAD_LEFT);
    }
}
