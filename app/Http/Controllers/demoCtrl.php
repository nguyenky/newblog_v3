<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JD\Cloudder\Facades\Cloudder;

class demoCtrl extends Controller
{
    public function index(Request $request){
    	$input = $request->all();
    	dd($input);
    }
}
