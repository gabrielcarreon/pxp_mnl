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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 255);
            $table->string('mobile_number', 20);
            $table->unsignedBigInteger('camera_id');
            $table->decimal('cost');
            $table->dateTime('pickup_date');
            $table->dateTime('dropoff_date');
            $table->integer('rent_days');
            $table->string('social_media_url');
            $table->string('ecp');
            $table->string('ecp_mobile_number');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
