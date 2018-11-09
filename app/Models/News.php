<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

/**
 * Class News
 * @package App\Models
 * @version May 28, 2017, 1:36 pm UTC
 */
class News extends Model
{
    use SoftDeletes;

    public $table = 'news';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'name',
        'picture',
        'preview',
        'detail',
        'category_id',
        'likes'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'picture' => 'string',
        'preview' => 'text',
        'detail' => 'text',
        'category_id' => 'integer',
        'likes' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required',
        'preview' => 'required',
        'detail' => 'required',
        'category_id' => 'required'
    ];

    public function category(){
        return $this->belongsTo(\App\Models\Category::class);
    }
    public function images(){
        return $this->hasMany(\App\Models\Picture::class);
    }
    public function getImage($picture){
        $find =  Storage::disk('public')->exists($picture);
        if($find){
            $url= url('storage/app/public/'.$picture);
        }else{
            $url = url('storage/app/public/default-new.png');
        }
        return $url;
    }
    public function comments(){
        return $this->hasMany(\App\Models\Comment::class,'news_id');
    }
    
}
