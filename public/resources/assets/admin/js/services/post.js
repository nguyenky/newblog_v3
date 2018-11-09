angular.module('app')
	.factory('Post', [
        '$http',
        '$q',
        '$window',
        '$state',
        '$rootScope',
        'baseurl',
        'Auth',
        '$localStorage',
        function($http,$q,$window,$state,$rootScope,baseurl,Auth,$localStorage){
        	if(!$localStorage.currentUser){
                $state.go('login');
            }
            var user = $localStorage.currentUser;
            function getAllPost (page){
                    var deferred = $q.defer();
                    $http({
                        url: baseurl+'admin/posts?page=' +page,
                        method: 'GET',
                        headers: {
                            'Authorization': user.remember_token,
                            'Content-Type': 'application/json'
                        }
                    }).then(function(result){
                        if(result && result.data.success){
                            deferred.resolve(result.data);
                        }
                    },function(error){
                        console.log(error);
                    });
                    return deferred.promise;
                }
            function updatePost (post){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/posts/'+post.id,
                    method: 'PUT',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data: post
                }).then(function(result){
                    if(result && result.data.success){
                        deferred.resolve(result.data);
                    }
                },function(error){
                    console.log(error);
                });
                return deferred.promise;
            }
            function deletePost (post){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/posts/'+post.id,
                    method: 'DELETE',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data: post
                }).then(function(result){
                    if(result && result.data.success){
                        deferred.resolve(result.data);
                    }
                },function(error){
                    console.log(error);
                });
                return deferred.promise;
            }
	return {
		getAllPost : getAllPost,
        updatePost : updatePost,
        deletePost : deletePost
	};
}])