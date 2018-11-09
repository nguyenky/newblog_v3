<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix'=>'auths','namespace'=>'API'],function(){
	Route::post('login','AuthController@login');
	Route::post('/register','UserAPIController@store');
});

// ADMIN
Route::group(['prefix'=>'admin','middleware'=>'api.auth','namespace'=>'API'],function(){
	// Profile / avatar
	Route::resource('profiles', 'ProfileAPIController');
	Route::post('uploadAvatar/{id}','ProfileAPIController@uploadAvatar');
	//Category
	Route::resource('categories', 'CategoryAPIController');
	Route::get('getAllCategory','CategoryAPIController@getAllCategory');
	Route::get('getAllCategoryTreeView','CategoryAPIController@getAllCategoryTreeView');
	// News
	Route::post('demo', 'NewsAPIController@demo');
	// User
	Route::resource('users', 'UserAPIController');
	//News
	Route::resource('news', 'NewsAPIController');
	Route::get('getAllNews','NewsAPIController@getAllNews');
	Route::post('addNews','NewsAPIController@addNews');
	Route::post('updateNews/{id}','NewsAPIController@update');
	// Image
	Route::post('upLoadFile','ImageController@addImage');
	// Posts
	Route::resource('posts', 'PostAPIController');
	// Musical
	Route::resource('playlists', 'PlaylistAPIController');
	// Notification
	Route::get('getNewNotification','NotificationController@getNewNotification');
	Route::get('getAllNotification','NotificationController@getAllNotification');
	Route::get('checkAll','NotificationController@checkAll');
	Route::get('delete/{id}','NotificationController@delete');
	Route::get('clear','NotificationController@clear');

	// Comments
	Route::get('getComments','CommentAPIController@index');
	Route::put('updateComment/{id}','CommentAPIController@update');
	Route::delete('deleteComment/{id}','CommentAPIController@destroy');
	// Contact
	Route::get('getAllContact','ContactController@getAll');
	Route::delete('deleteContact/{id}','ContactController@deleteContact');

	
});
// PUBLIC
Route::group(['prefix'=>'public','namespace'=>'API'],function(){
	// Musical
	
	/// Posts
	Route::get('getAllPosts','PostAPIController@index');
	Route::get('getPostPublic','PostAPIController@getPostPublic');
	Route::get('getNewsPublic','NewsAPIController@getNewsPublic');
	Route::get('getNewDetail/{id}','NewsAPIController@show');
	Route::get('like/{id}','NewsAPIController@like');
	Route::get('unlike/{id}','NewsAPIController@unLike');
	Route::get('getInstagram','ProfileAPIController@getInstagram');
	Route::get('getCategory','CategoryAPIController@getCategory');
	Route::get('getNewsSite/{id}','NewsAPIController@getNewsSite');
	Route::resource('comments', 'CommentAPIController');
	Route::get('search/{search}','NewsAPIController@search');
	/// Notification
	Route::post('insertNoti','PublicController@notification');
	Route::get('getPlaylists','PlaylistAPIController@index');
	Route::post('createContact','ContactController@create');


});
Route::group(['namespace'=>'API'],function(){
	Route::get('getProfile/{id}','ProfileAPIController@getProfile');
	Route::resource('pictures', 'PictureAPIController');
	Route::post('uploadImage/{id}','PictureAPIController@uploadImage');
});