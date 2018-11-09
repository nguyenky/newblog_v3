<?php

namespace App\Repositories;

use App\Models\Post;
use InfyOm\Generator\Common\BaseRepository;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class PostRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'caption',
        'note',
        'picture'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Post::class;
    }
    public function all($columns = ['*']){
        $posts = Post::orderBy('id','DESC')->paginate(12);
        foreach ($posts as $key => $post) {
            $find =  Storage::disk('public')->exists($post->picture);
            if($find){
                $post['url'] = url('storage/app/public/'.$post->picture);
            }else{
                $post['url'] = url('storage/app/public/default.jpg');
            }
        }
        return $posts;
    }
    public function create(array $attributes){
        $ext        = $attributes['picture']->guessClientExtension();
        $reName     = time().'.'.$ext;
        $img = Image::make($attributes['picture'])->resize(1360, 800);
        $img->save('storage/app/public/'.$reName);
        $post = Post::create([
            'caption'=>$attributes['caption'],
            'picture'=>$reName
            ]);
        $url = url('storage/app/public/'.$reName);
        $post['url'] = $url;
        return $post;
    }
    public function getPostPublic(){
        $posts = Post::orderBy('id','DESC')->limit(4)->get();
        foreach ($posts as $key => $post) {
            $find =  Storage::disk('public')->exists($post->picture);
            if($find){
                $post['url'] = url('storage/app/public/'.$post->picture);
            }else{
                $post['url'] = url('storage/app/public/default.jpg');
            }
        }
        return $posts;
    }
}
