<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePictureAPIRequest;
use App\Http\Requests\API\UpdatePictureAPIRequest;
use App\Models\Picture;
use App\Repositories\PictureRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

/**
 * Class PictureController
 * @package App\Http\Controllers\API
 */

class PictureAPIController extends AppBaseController
{
    /** @var  PictureRepository */
    private $pictureRepository;

    public function __construct(PictureRepository $pictureRepo)
    {
        $this->pictureRepository = $pictureRepo;
    }

    /**
     * Display a listing of the Picture.
     * GET|HEAD /pictures
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->pictureRepository->pushCriteria(new RequestCriteria($request));
        $this->pictureRepository->pushCriteria(new LimitOffsetCriteria($request));
        $pictures = $this->pictureRepository->all();

        return $this->sendResponse($pictures->toArray(), 'Pictures retrieved successfully');
    }

    /**
     * Store a newly created Picture in storage.
     * POST /pictures
     *
     * @param CreatePictureAPIRequest $request
     *
     * @return Response
     */
    public function store(CreatePictureAPIRequest $request)
    {
        $input = $request->all();

        $pictures = $this->pictureRepository->create($input);

        return $this->sendResponse($pictures->toArray(), 'Picture saved successfully');
    }

    /**
     * Display the specified Picture.
     * GET|HEAD /pictures/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Picture $picture */
        $picture = $this->pictureRepository->findWithoutFail($id);

        if (empty($picture)) {
            return $this->sendError('Picture not found');
        }

        return $this->sendResponse($picture->toArray(), 'Picture retrieved successfully');
    }

    /**
     * Update the specified Picture in storage.
     * PUT/PATCH /pictures/{id}
     *
     * @param  int $id
     * @param UpdatePictureAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdatePictureAPIRequest $request)
    {
        $input = $request->all();

        /** @var Picture $picture */
        $picture = $this->pictureRepository->findWithoutFail($id);

        if (empty($picture)) {
            return $this->sendError('Picture not found');
        }

        $picture = $this->pictureRepository->update($input, $id);

        return $this->sendResponse($picture->toArray(), 'Picture updated successfully');
    }

    /**
     * Remove the specified Picture from storage.
     * DELETE /pictures/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Picture $picture */
        $picture = $this->pictureRepository->findWithoutFail($id);
        $find =  Storage::disk('public')->exists($picture->name);
            if($find){
                unlink('storage/app/public/'.$picture->name );
            }
        if (empty($picture)) {
            return $this->sendError('Picture not found');
        }

        $picture->delete();

        return $this->sendResponse($id, 'Picture deleted successfully');
    }
    public function uploadImage(Request $request,$id){
        $isPicture = $request->hasFile('image');
        $input = $request->all();
        // return $input;
        if($isPicture){

            $ext        = $input['image']->guessClientExtension();
            $reName     = rand(1,999999).'-'.time().'.'.$ext;
            $img = Image::make($input['image']);
            $img->save('storage/app/public/'.$reName);
            $attributes['picture'] = $reName;
            $url = url('storage/app/public/'.$reName);

            $pic = Picture::create(['name'=>$reName,'news_id'=>$id]);
            $pic['url'] = $url;
            return $this->sendResponse($pic, 'Picture upload successfully'); 
        }else{
            return $this->sendError('Picture not upload');
        }
    }
}
