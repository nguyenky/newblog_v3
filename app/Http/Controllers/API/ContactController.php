<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Http\Controllers\AppBaseController;
use Response;
class ContactController extends AppBaseController
{
	public function getAll(){
    	$contacts = Contact::all();
    	return $this->sendResponse($contacts->toArray(), 'Contacts retrieved successfully');
    }
    public function create(Request $request){
    	$input = $request->all();
    	$contact = Contact::create($input);
    	return $this->sendResponse($contact->toArray(), 'Contact saved successfully');
    }
    public function deleteContact( $id){
    	$contact = Contact::find($id)->delete();
    	return $this->sendResponse($contact, 'Contact deleted successfully');
    }
}
