<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\FavBook;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\UserData;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Category::truncate();
        User::truncate();
        Author::truncate();
        Book::truncate();
        FavBook::truncate();
        Order::truncate();
        OrderItem::truncate();
        UserData::truncate();



        User::factory(5)->create();
        $user1 = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin1234'),
            'admin' => true,
        ]);
        $user2 = User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => Hash::make('user1234'),
            'admin' => false,
        ]);
        $cat1 = Category::factory()->create();
        $cat2 = Category::factory()->create();

        Book::factory(5)->create([
            'category_id' => $cat1->id,
        ]);

        Book::factory(3)->create([
            'category_id' => $cat2->id,
        ]);

        $book1 = Book::factory()->create([
            'category_id' => $cat1->id,
        ]);

        $book2 = Book::factory()->create([
            'category_id' => $cat2->id,
        ]);

        FavBook::factory()->create([
            'user_id' => $user1->id,
            'book_id' => $book1->id,
        ]);

        FavBook::factory()->create([
            'user_id' => $user1->id,
            'book_id' => $book2->id,
        ]);

        $userData = UserData::create([
            'name' => 'Admin',
            'surname' => 'Admin',
            'email' => 'admin@example.com',
            'adress' => 'Jasenička 9',
            'city' => 'Beograd',
            'postal_code' => '11000',
            'phone_number' => '0690203955',
            'user_id' => $user1->id,
        ]);

        $order = Order::create([
            'order_number' => 'A327B',
            'price_total' => 200,
            'item_count' => 3,
            'user_data_id' => 1,
        ]);

        $orderItem1 = OrderItem::create([
            'order_id' => $order->id,
            'book_id' => $book1->id,
            'quantity' => 2,
        ]);

        $orderItem2 = OrderItem::create([
            'order_id' => $order->id,
            'book_id' => $book2->id,
            'quantity' => 1,
        ]);
    }
}
