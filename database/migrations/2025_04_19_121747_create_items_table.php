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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->text('description');
            $table->unsignedBigInteger('category_id');
            $table->integer('stock_beginning_year')->default(0.00);
            $table->integer('progressive_annual_inbound', )->default(0.00);
            $table->integer('progressive_annual_outbound')->default(0.00);
            $table->integer('safety_stock')->default(0.00);
            $table->integer('available_stock')->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
