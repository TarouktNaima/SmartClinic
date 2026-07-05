<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 👑 إنشاء حساب الـ Admin
        User::create([
            'name' => 'Houda Admin',
            'email' => 'adminhouda@gmail.com',
            'password' => Hash::make('admin1234'), // 🔑 الكلمة السرية باش غاتدخلي
            'role' => 'admin',                     // 🎯 الرول لي حددنا ليه
        ]);

        
        
    }
}