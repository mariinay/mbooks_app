<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FavBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'fav_book';


    public function toArray($request)
    {

        return [
            'id' => $this->resource->id,
            'user' => new UserResource($this->resource->user),
            'book' => new BookResource($this->resource->book)
        ];
    }
}
