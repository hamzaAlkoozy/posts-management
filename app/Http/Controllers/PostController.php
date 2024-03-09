<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        // Page number is fetched by default using paginate()
        $postsPerPage = 10;

        return Post::where('user_id', Auth::id())->paginate($postsPerPage);
    }

    public function show(Post $post)
    {
        $this->authorize('show', $post);

        return $post;
    }

    public function store(PostRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

        // Handle the user upload of the image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $path;
        }

        return Post::create($validatedData);
    }

    public function update(PostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

        // Handle the user upload of the image
        if ($request->hasFile('image')) {
            // Delete the old image from the filesystem
            if ($post->image) {
                Storage::delete('public/' . $post->image);
            }

            $path = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $path;
        }

        $post->update($validatedData);
        return $post;
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        // Delete the image from the filesystem
        if ($post->image) {
            Storage::delete('public/' . $post->image);
        }

        $post->delete();
        return response()->json(null, 204);
    }
}
