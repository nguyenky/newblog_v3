<?php

namespace App\Models;

use Eloquent as Model;

/**
 * Class Post
 * @package App\Models
 * @version July 2, 2017, 2:34 pm UTC
 */
class Post extends Model
{
    public $table = 'posts';
    public $fillable = [
        'caption',
        'note',
        'picture'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'caption' => 'string',
        'note' => 'string',
        'picture' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'caption' => 'required'
    ];

    
}
