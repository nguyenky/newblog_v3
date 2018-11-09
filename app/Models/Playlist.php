<?php

namespace App\Models;

use Eloquent as Model;

/**
 * Class Playlist
 * @package App\Models
 * @version July 29, 2017, 10:49 am UTC
 */
class Playlist extends Model
{

    public $table = 'playlists';
    public $fillable = [
        'name',
        'content',
        'note'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'content' => 'string',
        'note' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    
}
