<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Profile
 * @package App\Models
 * @version May 24, 2017, 11:19 am UTC
 */
class Profile extends Model
{
    use SoftDeletes;

    public $table = 'profiles';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'user_id',
        'fullname',
        'phone',
        'address',
        'preview',
        'cv',
        'about',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
        'fullname' => 'string',
        'phone' => 'string',
        'address' => 'string',
        'preview' => 'text',
        'cv' => 'string',
        'about' =>'text'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'user_id' => 'required'
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
