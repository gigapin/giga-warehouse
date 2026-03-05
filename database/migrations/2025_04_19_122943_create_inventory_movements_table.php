<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_movements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('causal_id');
            $table->unsignedBigInteger('item_id');
            $table->enum('inventory_movement_type', ['inbound', 'outbound']);
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable()->default(null);
            $table->unsignedBigInteger('detail_order_id');
            $table->integer('quantity');
            $table->string('reference_ddt')->nullable();
            $table->date('inventory_movement_date');
            $table->decimal('purchase_price_cad', 10, 2)->default(0.00);
            $table->decimal('sale_price_cad', 10, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_movements');
    }
};
