<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public $table = 'notifications';
    public $fillable = [
        'content',
        'type',
        'comment_id',
        'news_id',
        'status',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'type' => 'integer',
        'content' => 'string',
        'news_id' => 'integer',
        'comment_id' => 'integer',
        'status' => 'boolean',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'type' => 'required',
        'content' => 'required',
    ];
}
