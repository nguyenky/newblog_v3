<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Http\Controllers\AppBaseController;
use Response;
class NotificationController extends AppBaseController
{
    public function getNewNotification(){
    	$notifications = Notification::orderBy('id','DESC')->where('status',false)->get();
    	return $this->sendResponse($notifications, 'Notification retrieved successfully');
    }
    public function checkAll(){
    	$notifications = Notification::where('status',false)->update(['status'=>true]);
    	return $this->sendResponse([], 'Notifications update successfully');
    }
    public function getAllNotification(){
    	$notifications = Notification::orderBy('id','DESC')->get();
    	return $this->sendResponse($notifications, 'Notification retrieved successfully');
    }
    public function delete($id){
    	$noti = Notification::find($id)->delete();
    	return $this->sendResponse([], 'Notification delete successfully');
    }
    public function clear(){
    	$notis = Notification::where('status',true)->delete();
    	return $this->sendResponse([], 'Notification delete successfully');
    }
}
