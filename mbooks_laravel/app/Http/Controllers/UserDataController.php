<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserDataCollection;
use App\Http\Resources\UserDataResource;
use App\Models\User;
use App\Models\UserData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = UserData::all();
        return new UserDataCollection($data);
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
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'email' => 'required|email',
            'adress' => 'required|string|max:50',
            'city' => 'required',
            'postal_code' => 'required',
            'phone_number' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors(), 'success' => false]);
        }

        $user_data = UserData::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'adress' => $request->adress,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'phone_number' => $request->phone_number,
            'user_id' => $request->user_id,

        ]);

        return response()->json(['User data stored successfully.', new UserDataResource($user_data), 'success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserData  $userData
     * @return \Illuminate\Http\Response
     */
    public function show($user_data_id)
    {
        $user_data = UserData::find($user_data_id);
        if (is_null($user_data)) {
            return response()->json('Data not found', 404);
        }
        return new UserDataResource($user_data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserData  $userData
     * @return \Illuminate\Http\Response
     */
    public function edit(UserData $userData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserData  $userData
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user_data = UserData::find($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'email' => 'required|email',
            'adress' => 'required|string|max:50',
            'city' => 'required',
            'postal_code' => 'required',
            'phone_number' => 'numeric'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());


        $user_data->name = $request->name;
        $user_data->surname = $request->surname;
        $user_data->email = $request->email;
        $user_data->adress = $request->adress;
        $user_data->city = $request->city;
        $user_data->postal_code = $request->postal_code;
        $user_data->phone_number = $request->phone_number;

        $user_data->save();

        return response()->json(['User data updated successfully.', new UserDataResource($user_data), 'success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserData  $userData
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserData $userData)
    {
        /*        $user = auth()->user();
        if ($user->user_data_id == $userData->id) {
            $user->user_data_id = null;
        }
        $user->update;*/
        $userData->delete();
        return response()->json('User data deleted successfully.');
    }

    public function showByUser($user_id)
    {
        $user_data = UserData::get()->where('user_id', $user_id);
        if (is_null($user_data)) {
            return response()->json('Data not found', 404);
        }
        return new UserDataResource($user_data);
    }
}
