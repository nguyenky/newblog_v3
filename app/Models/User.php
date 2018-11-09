<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Lcobucci\JWT\Builder;
/**
 * Class User
 * @package App\Models
 * @version May 12, 2017, 11:52 pm UTC
 */
class User extends Model
{
    use SoftDeletes;

    public $table = 'users';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'name',
        'email',
        'password',
        'remember_token'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'password' => 'string',
        'remember_token' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required',
        'email' => 'required',
        'password' => 'required'
    ];
    public function profile()
    {
        return $this->hasOne(\App\Models\Profile::class);
    }
    public function getAccessToken()
    {
        $this->remember_token = (string) (new Builder())->setIssuer('http://2solid.vn/') 
            ->setAudience('http://2solid.vn/')
            ->setId('4f1g23a12aa', true) 
            ->setIssuedAt(time())
            ->setExpiration(time() + 86400)
            ->set('id', $this->id)
            ->set('email', $this->email)
            ->getToken();
    }
    
}
