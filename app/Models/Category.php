<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;



/**
 * Class Category
 * @package App\Models
 * @version May 27, 2017, 5:11 am UTC
 */
class Category extends Model
{
    use SoftDeletes;

    public $table = 'categories';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'name',
        'category_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'category_id' => 'integer',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required'
    ];
    public function hasCategories(){
        return $this->hasMany(\App\Models\Category::class);
    }
    public function hasParent(){
        return $this->belongsTo(\App\Models\Category::class,'category_id');
    }
    public function getLatest(){
        $newLatest = News::where('category_id',$this->id)->latest()->first();
        if($newLatest){
            $find =  Storage::disk('public')->exists($newLatest->picture);
            if($find){
                $newLatest['url'] = url('storage/app/public/'.$newLatest->picture);
            }else{
                $newLatest['url'] = url('storage/app/public/default-new.png');
            }
        }
        
        return $newLatest;
    }
    public function news(){
        return $this->hasMany(\App\Models\News::class);
    }
    // public function countNews (){
    //     $cat = Category::find($this->id)->with('news')-
    // }
    
}
