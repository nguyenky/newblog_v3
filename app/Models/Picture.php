<?php

namespace App\Models;

use Eloquent as Model;

/**
 * Class Picture
 * @package App\Models
 * @version June 17, 2017, 12:55 pm UTC
 */
class Picture extends Model
{

    public $table = 'pictures';
    
    public $fillable = [
        'name',
        'news_id',
        'post_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'news_id' => 'integer',
        'post_id' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required',
    ];

    
}
