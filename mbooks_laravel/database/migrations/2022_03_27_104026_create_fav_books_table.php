<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fav_books', function (Blueprint $table) {
            $table->id();
            //$table->primary(array('user_id', 'book_id'));
            $table->foreignId('user_id');
            $table->foreignId('book_id');
            $table->unique(array('user_id', 'book_id'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fav_books');
    }
};
