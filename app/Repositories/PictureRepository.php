<?php

namespace App\Repositories;

use App\Models\Picture;
use InfyOm\Generator\Common\BaseRepository;

class PictureRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'news_id',
        'post_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Picture::class;
    }
}
