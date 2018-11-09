<?php

namespace App\Models;

use Eloquent as Model;

/**
 * Class Comment
 * @package App\Models
 * @version August 7, 2017, 2:04 am UTC
 */
class Comment extends Model
{
    public $table = 'comments';
    public $fillable = [
        'name',
        'avatar',
        'content',
        'news_id',
        'comment_id',
        'admin'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'avatar' => 'string',
        'content' => 'string',
        'news_id' => 'integer',
        'comment_id' => 'integer',
        'admin' => 'boolean'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required',
        'content' => 'required',
        'news_id' => 'required'
    ];
    public function news(){
        return $this->belongsTo(\App\Models\News::class,'news_id');
    }

    
}
