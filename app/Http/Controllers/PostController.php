<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'category' => 'required|max:255',
            'publication_date' => 'required|date',
            'description' => 'required',
        ]);

        $validatedData['user_id'] = Auth::id();

        return Post::create($validatedData);
    }

    public function show(Post $post)
    {
        return $post;
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'category' => 'required|max:255',
            'publication_date' => 'required|date',
            'description' => 'required',
            'user_id' => 'required|exists:users,id'
        ]);

        $post->update($validatedData);
        return $post;
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();
        return response()->json(null, 204);
    }
}
