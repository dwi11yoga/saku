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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('wallet_id');
            $table->foreignId('category_id');
            $table->string('direction')->default('out'); // in=debit, out=credit
            $table->bigInteger('amount')->default(0);
            $table->dateTime('date');
            $table->string('location')->nullable();
            $table->string('note')->nullable();
            $table->datetimes();
            $table->softDeletes();

            $table->index('user_id');
            $table->index(['user_id', 'category_id']);
            $table->index(['user_id', 'wallet_id']);
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
