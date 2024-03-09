<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // TODO -hamza make two fixed emails like
        //  hamza@gmail.com
        //  john@gmail.com
        User::factory(2)->create();
    }
}
