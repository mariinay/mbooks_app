<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all();
        return new OrderCollection($orders);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'price_total' => 'required|numeric',
            'item_count' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $order_number = Str::random(10);

        $o = Order::create([
            'order_number' => $order_number,
            'price_total' => $request->price_total,
            'item_count' => $request->item_count,
            'user_data_id' => $request->user_data_id
        ]);

        $order = Order::find($o->id);

        return response()->json(['Order created successfully.', new OrderResource($order), 'success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($order_id)
    {
        $order = Order::find($order_id);
        if (is_null($order)) {
            return response()->json('Data not found', 404);
        }
        return new OrderResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'price_total' => 'required|numeric',
            'item_count' => 'required|numeric',
            'payment_method' => 'required'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());


        $order->order_number = $request->order_number;
        $order->status = $request->status;
        $order->price_total = $request->price_total;
        $order->item_count = $request->item_count;
        $order->is_paid = $request->is_paid;
        $order->payment_method = $request->payment_method;
        $order->user_data_id = $request->user_data_id;

        $order->save();

        return response()->json(['Order updated successfully.', new OrderResource($order), 'success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json('Order deleted successfully.');
    }
}
