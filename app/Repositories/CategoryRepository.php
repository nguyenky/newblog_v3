<?php

namespace App\Repositories;

use App\Models\Category;
use InfyOm\Generator\Common\BaseRepository;

class CategoryRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description',
        'category_id',
        'impotant'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Category::class;
    }
    public function getAllCategory(){
        $categories = Category::orderBy('id','ASC')->get();
        foreach ($categories as $key => $category) {
            $category->hasCategories;
            $category->hasParent;
            // if(!empty($hasCats)){
            //     // $categories[$key]['hasCats'] = $category->hasCategories;
            // }
            
        }

        return $categories;
    }
    public function recursion($items){
        foreach ($items as $key => $item) {
            $hasCats =  $item->hasCategories;
            if($hasCats){
                $recursion= $this->recursion($hasCats);
            }    
        }
        return $items;
    }
    public function getAllCategoryTreeView(){
        $categories = Category::orderBy('id','ASC')->select('id','name','category_id')->get();
        // foreach ($categories as $key => $category) {
        //     $hasParent = $category->hasParent;
        // }
        // $recursion = $this->recursion($categories);
        return $categories;
    }
    public function getCategory(){
        $categories = Category::select('id','name')->get();
        foreach ($categories as $key => $cat) {
            $categories[$key]['count'] = $cat->news()->count();
        }
        return $categories;
    }

}
