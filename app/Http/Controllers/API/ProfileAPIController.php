<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateProfileAPIRequest;
use App\Http\Requests\API\UpdateProfileAPIRequest;
use App\Models\Profile;
use App\Repositories\ProfileRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Vinkla\Instagram\Instagram;
/**
 * Class ProfileController
 * @package App\Http\Controllers\API
 */

class ProfileAPIController extends AppBaseController
{
    /** @var  ProfileRepository */
    private $profileRepository;

    public function __construct(ProfileRepository $profileRepo)
    {
        $this->profileRepository = $profileRepo;
    }

    /**
     * Display a listing of the Profile.
     * GET|HEAD /profiles
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->profileRepository->pushCriteria(new RequestCriteria($request));
        $this->profileRepository->pushCriteria(new LimitOffsetCriteria($request));
        $profiles = $this->profileRepository->all();

        return $this->sendResponse($profiles->toArray(), 'Profiles retrieved successfully');
    }

    /**
     * Store a newly created Profile in storage.
     * POST /profiles
     *
     * @param CreateProfileAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateProfileAPIRequest $request)
    {
        $input = $request->all();

        $profiles = $this->profileRepository->create($input);

        return $this->sendResponse($profiles->toArray(), 'Profile saved successfully');
    }

    /**
     * Display the specified Profile.
     * GET|HEAD /profiles/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Profile $profile */
        $profile = $this->profileRepository->findWithoutFail($id);
        // dd($profile->toArray());
        if (empty($profile)) {
            return $this->sendError('Profile not found');
        }

        return $this->sendResponse($profile->toArray(), 'Profile retrieved successfully');
    }

    /**
     * Update the specified Profile in storage.
     * PUT/PATCH /profiles/{id}
     *
     * @param  int $id
     * @param UpdateProfileAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateProfileAPIRequest $request)
    {
        $input = $request->all();

        /** @var Profile $profile */
        $profile = $this->profileRepository->findWithoutFail($id);

        if (empty($profile)) {
            return $this->sendError('Profile not found');
        }

        $profile = $this->profileRepository->update($input, $id);

        return $this->sendResponse($profile->toArray(), 'Profile updated successfully');
    }

    /**
     * Remove the specified Profile from storage.
     * DELETE /profiles/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Profile $profile */
        $profile = $this->profileRepository->findWithoutFail($id);

        if (empty($profile)) {
            return $this->sendError('Profile not found');
        }

        $profile->delete();

        return $this->sendResponse($id, 'Profile deleted successfully');
    }
    public function uploadAvatar(Request $request,$id){
        $input = $request->all();
        // dd($input);
        $profile = $this->profileRepository->findWithoutFail($id);

        if (empty($profile)) {
            return $this->sendError('Profile not found');
        }
        if($profile->avatar){
            $find =  Storage::disk('public')->exists($profile->avatar);
            if($find){
                unlink('storage/app/public/'.$profile->avatar );
            }
        }
        if($request->hasFile('avatar')){

            $upload = $this->profileRepository->uploadAvatar($input,$id);
        }else{
            return $this->sendError('Not found files');
        }
        return $upload;
    }
    public function getProfile($id){
        $profile = $this->profileRepository->showProfile($id);
        // dd($profile->toArray());
        if (empty($profile)) {
            return $this->sendError('Profile not found');
        }

        return $this->sendResponse($profile, 'Profile retrieved successfully');
    }
    public function getInstagram(){
        // $instagram = new Instagram();
        // $media =  $instagram->get('_ky.lenguyen_');
        // return $this->sendResponse($media, 'Instagram retrieved successfully');
        $str = file_get_contents("https://api.instagram.com/v1/users/2293866932/media/recent/?access_token=2293866932.1677ed0.5fb0088e7ad44161a69a2de237d04fa7");

        $json = json_decode($str, true);

        return $this->sendResponse($json, 'Instagram retrieved successfully');
    }
}
