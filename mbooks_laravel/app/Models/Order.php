<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'price_total',
        'item_count',
        'user_data_id',
    ];

    public function orderItem()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function userData()
    {
        return $this->belongsTo(UserData::class);
    }
}
