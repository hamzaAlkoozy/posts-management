<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $fullImageUrl;

    protected $appends = ['full_image_url'];
    protected $fillable = ['title', 'category', 'publication_date', 'description', 'image', 'user_id'];

    public function getFullImageUrlAttribute()
    {
        // when uploading an image, the name is hashed, so this condition is OK
        if ($this->image === 'images/placeholder.jpeg') {
            // Placeholder image is in the 'public/images' directory
            return asset('public/' . $this->image);
        } else {
            // Uploaded images are in the 'public/storage/images' directory
            return asset('public/storage/' . $this->image);
        }
    }

    public function scopeWithSearch($query)
    {
        $search = request()->search;
        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        return $query;
    }

    public function scopeWithSort($query)
    {
        $sort = request()->sort;
        if ($sort && $sort !== "default") {
            if ($sort === 'title') {
                $query->orderBy($sort, 'asc');
            } else if ($sort === 'publication_date') {
                $query->orderBy($sort, 'desc');
            }
        }

        return $query;
    }

}
