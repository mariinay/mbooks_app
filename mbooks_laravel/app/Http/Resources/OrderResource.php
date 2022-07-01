<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'order_number' => $this->resource->order_number,
            'status' => $this->resource->status,
            'price_total' => $this->resource->price_total,
            'item_count' => $this->resource->item_count,
            'is_paid' => $this->resource->is_paid,
            'payment_method' => $this->resource->payment_method,
            //'user_data' => new UserDataResource($this->resource->userData),
            'user_data_id' => $this->resource->userData->id,
            'user_data_name' => $this->resource->userData->name,
            'user_data_surname' => $this->resource->userData->surname,
            'user_data_email' => $this->resource->userData->email,
            'user_data_adress' => $this->resource->userData->adress,
            'user_data_city' => $this->resource->userData->city,
            'user_data_postal_code' => $this->resource->userData->postal_code,
            'user_data_phone_number' => $this->resource->userData->phone_number,
            'user_data_user' => $this->resource->userData->user,
        ];
    }
}
