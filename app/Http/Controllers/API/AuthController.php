<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Http\Controllers\AppBaseController;
use Auth;
use Illuminate\Support\Facades\Storage;

class AuthController extends AppBaseController
{
    protected $repository;
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
    public function login(Request $request){
    	if(\Auth::attempt($request->only('email', 'password')))
        {
            $user = $this->repository->find(\Auth::user()->id);
            $user->getAccessToken();
            $profile = $user->profile;
            if($profile && $profile->avatar){
                $user->avatar=url('storage/app/public/'.$profile->avatar);
            }
            $user->save();
            return $this->sendResponse($user->toArray(), 'Login Successfully');
        }else{
            return $this->sendError('Login Failed! Email or password incorrect.');
        }
    }
}
