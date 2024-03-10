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
        return $this->image ? asset('public/storage/' . $this->image) : null;
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
            $query->orderBy($sort, 'asc');
        }

        return $query;
    }

}
