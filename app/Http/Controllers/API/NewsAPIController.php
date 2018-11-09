<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateNewsAPIRequest;
use App\Http\Requests\API\UpdateNewsAPIRequest;
use App\Models\News;
use App\Repositories\NewsRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use Illuminate\Support\Facades\Storage;
/**
 * Class NewsController
 * @package App\Http\Controllers\API
 */

class NewsAPIController extends AppBaseController
{
    /** @var  NewsRepository */
    private $newsRepository;

    public function __construct(NewsRepository $newsRepo)
    {
        $this->newsRepository = $newsRepo;
    }

    /**
     * Display a listing of the News.
     * GET|HEAD /news
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->newsRepository->pushCriteria(new RequestCriteria($request));
        $this->newsRepository->pushCriteria(new LimitOffsetCriteria($request));
        $news = $this->newsRepository->all();

        return $this->sendResponse($news->toArray(), 'News retrieved successfully');
    }

    /**
     * Store a newly created News in storage.
     * POST /news
     *
     * @param CreateNewsAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateNewsAPIRequest $request)
    {
        $input = $request->all();

        $news = $this->newsRepository->create($input);

        return $this->sendResponse($news->toArray(), 'News saved successfully');
    }

    /**
     * Display the specified News.
     * GET|HEAD /news/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var News $news */
        $new = $this->newsRepository->findWithoutFail($id);
        $images = $new->images;
        if($images){
            foreach ($images as $key => $image) {
                $find =  Storage::disk('public')->exists($image->name);
                if($find){
                    $image['url'] = url('storage/app/public/'.$image->name);
                }else{
                    $image['url'] = url('storage/app/public/default-new.png');
                }
            }
        }
        $new['url'] = $new->getImage($new->picture);
        $new['comments'] = $new->comments()->select('id','name','avatar','admin','content','created_at')->get();
        $new['category'] = $new->category()->select('id','name')->first();
        if (empty($new)) {
            return $this->sendError('News not found');
        }

        return $this->sendResponse($new->toArray(), 'News retrieved successfully');
    }

    /**
     * Update the specified News in storage.
     * PUT/PATCH /news/{id}
     *
     * @param  int $id
     * @param UpdateNewsAPIRequest $request
     *
     * @return Response
     */
    public function update($id, Request $request)
    {
        $input = $request->all();
        // return $input;

        /** @var News $news */
        $news = $this->newsRepository->findWithoutFail($id);

        if (empty($news)) {
            return $this->sendError('News not found');
        }
        $isPicture = $request->hasFile('file');
        if(!$isPicture){
            $input['file']= null;
        }
        $news = $this->newsRepository->update($input, $id);

        return $this->sendResponse($news->toArray(), 'News updated successfully');
    }

    /**
     * Remove the specified News from storage.
     * DELETE /news/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var News $news */
        $news = $this->newsRepository->findWithoutFail($id);

        if (empty($news)) {
            return $this->sendError('News not found');
        }
        if($news->picture){
            $find =  Storage::disk('public')->exists($news->picture);
            if($find){
                unlink('storage/app/public/'.$news->picture );
            }
        }

        $news->delete();

        return $this->sendResponse($id, 'News deleted successfully');
    }
    public function getAllNews(){

        $news = $this->newsRepository->getAllNews();
        return $this->sendResponse($news->toArray(), 'News retrieved successfully');   
    }
    public function addNews(CreateNewsAPIRequest $request)
    {
        $input = $request->all();
        // dd($input);
        $isPicture = $request->hasFile('picture');
        if(!$isPicture){
            $input['picture']= null;
        }

        $news = $this->newsRepository->addNews($input);

        return $this->sendResponse($news->toArray(), 'News saved successfully');
    }
    /// -------------PUBLIC-------------
    public function getNewsPublic(){
        $news = $this->newsRepository->getNewsPublic();
        if (empty($news)) {
            return $this->sendError('News not found');
        }
        return $this->sendResponse($news, 'News retrieved successfully');

    }
    public function like($id){
        $new = News::find($id);
        $new->likes = $new->likes +1;
        $new->save();
        return $this->sendResponse([], 'News retrieved successfully');
    }
    public function unLike($id){
        $new = News::find($id);
        $new->likes = $new->likes -1 ;
        $new->save();
        return $this->sendResponse([], 'News retrieved successfully');
    }
    public function getNewsSite($id){
        $news = News::orderBy('id','DESC')->where('category_id',$id)->paginate(9);
        foreach ($news as $key => $new) {
            $new['comments'] = $new->comments()->select('id')->count();
            if($new->picture){
                $find =  Storage::disk('public')->exists($new->picture);
                if($find){
                    $new['url'] = url('storage/app/public/'.$new->picture);
                }else{
                    $new['url'] = url('storage/app/public/default-new.png');
                }
            }else{
                $new['url'] = url('storage/app/public/default-new.png');
            }
        }
        return $this->sendResponse($news, 'News retrieved successfully');
    }
    public function search($search){
        $news = News::orderBy('id','DESC')->where('name','LIKE','%'.$search.'%')->paginate(10);
        return $this->sendResponse($news, 'News retrieved successfully');
    }
    public function uploadImage($id){
        $isPicture = $request->hasFile('image');
        if($isPicture){
            dd('yes');
        }else{
            dd('no');
        }
    }
}
