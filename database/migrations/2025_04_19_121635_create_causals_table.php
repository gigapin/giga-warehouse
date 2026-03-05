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
        Schema::create('causals', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->text('description');
            $table->enum('typology', ['inbound', 'outbound']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('causals');
    }
};
