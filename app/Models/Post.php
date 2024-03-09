<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $fullImageUrl;

    protected $appends = ['full_image_url'];
    protected $fillable = ['title', 'category', 'publication_date', 'description', 'image' ,'user_id'];

    public function getFullImageUrlAttribute()
    {
        return $this->image ? asset('public/storage/' . $this->image) : null;
    }
}
