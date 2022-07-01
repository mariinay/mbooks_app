<?php

namespace App\Http\Controllers;

use App\Http\Resources\FavBookCollection;
use App\Http\Resources\FavBookResource;
use App\Models\FavBook;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FavBookController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = auth()->user()->id;
        //$user = $request->user;
        //$user_id = $user->id;
        $books = FavBook::get()->where('user_id', $user_id);
        if (is_null($books)) {
            return response()->json('Data not found', 404);
        }
        return new FavBookCollection($books);
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
            'book_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $favBook = FavBook::create([
            'book_id' => $request->book_id,
            'user_id' => auth()->user()->id,
        ]);

        return response()->json(['Favourite book created successfully.', new FavBookResource($favBook), 'success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FavBook  $favBook
     * @return \Illuminate\Http\Response
     */
    public function show($favBook_id)
    {


        $favBook = FavBook::get()->where('id', $favBook_id)->first();
        if (!$favBook) {
            return response()->json('Data not found', 404);
        }
        return new FavBookResource($favBook);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FavBook  $favBook
     * @return \Illuminate\Http\Response
     */
    public function edit(FavBook $favBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FavBook  $favBook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FavBook $favBook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($favBook_id)
    {

        $favBook = FavBook::get()->where('id', $favBook_id)->first();
        if (!$favBook) {
            return response()->json('Data not found', 404);
        }

        $favBook->delete();

        return response()->json('Book removed from favourites successfully.');
    }
}
