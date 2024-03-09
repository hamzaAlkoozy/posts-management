<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        // Page number is fetched by default using paginate()
        $postsPerPage = 10;

        return Post::where('user_id', Auth::id())->paginate($postsPerPage);
    }

    public function store(PostRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

        return Post::create($validatedData);
    }

    public function show(Post $post)
    {
        $this->authorize('show', $post);

        return $post;
    }

    public function update(PostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

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
