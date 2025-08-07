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
        Schema::table('votes', function (Blueprint $table) {
            Schema::table('votes', function (Blueprint $table) {
                $table->dropUnique('votes_user_id_election_id_unique');
                $table->dropConstrainedForeignId('user_id');
                if (Schema::hasColumn('votes', 'vote_time')) {
                    $table->dropColumn('vote_time');
                }
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('votes', function (Blueprint $table) {
            $table->foreignUuid('user_id')->nullable();
            $table->unique(['user_id', 'election_id']);
            $table->timestamp('vote_time')->nullable();
        });
    }
};
