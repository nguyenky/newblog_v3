<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Repositories\UserRepository;
class APIAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $jwtToken = \Request::header('Authorization');
        $userRepossitory = new UserRepository(app());
        $user = $userRepossitory->findByField('remember_token',$jwtToken)->first();
        if(!$user){
            return \Response::json([
                'success' => false,
                'status' => 401,
                'message' => 'Unauthorized',
                'data' => null
            ]);
        }
        return $next($request);
    }
}
