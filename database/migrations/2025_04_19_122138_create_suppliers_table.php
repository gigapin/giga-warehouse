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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('company_name', 100);
            $table->string('vat_number', 11)->unique();
            $table->string('fiscal_code', 16)->unique();
            $table->unsignedBigInteger('municipality_id');
            $table->string('address');
            $table->string('sdi_code', 10)->nullable()->default(null);
            $table->string('pec', 50)->nullable()->default(null);;
            $table->string('email', 50)->unique();
            $table->string('phone' ,50)->unique();
            $table->tinyInteger('service')->unsigned()->nullable()->default(null);
            $table->tinyInteger('punctuality')->unsigned()->nullable()->default(null);
            $table->tinyInteger('quality')->unsigned()->nullable()->default(null);
            $table->tinyInteger('prices')->unsigned()->nullable()->default(null);
            $table->tinyInteger('assistance')->unsigned()->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
