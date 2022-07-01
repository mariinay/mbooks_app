<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = 'order_item';

    public function toArray($request)
    {
        $order = Order::find($this->resource->order_id);
        return [
            'id' => $this->resource->id,
            //'order' => new OrderResource($this->resource->order_id),
            'order' => $order->order_number,
            'book' => $this->resource->book->title,
            'quantity' => $this->resource->quantity

        ];
    }
}
