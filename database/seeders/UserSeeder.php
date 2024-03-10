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
        $defaultPassword = 12345678;

        User::factory([
            'email' => 'hamza@gmail.com',
            'password' => $defaultPassword
        ])->create();

        User::factory([
            'email' => 'john@gmail.com',
            'password' => $defaultPassword

        ])->create();
    }
}
