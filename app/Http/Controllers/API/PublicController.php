<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Http\Controllers\AppBaseController;
use Response;
class PublicController extends AppBaseController
{
    public function notification(Request $request){
    	$input = $request->all();
    	$notification = Notification::create($input);
    	return $this->sendResponse($notification, 'Notification create successfully');
    }
}
