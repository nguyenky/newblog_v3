angular.module('app')
	.factory('News', [
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
            function getNews (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/getAllNews',
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
            function addNews (post){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/addNews',
                    method: 'POST',
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
            function updateNews (news){
                var deferred = $q.defer();
                $http({
                    url: baseurl + 'admin/news/'+ news.id,
                    method: 'PUT',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data: news,
                }).then(function(result){
                    if(result && result.data.success){
                        deferred.resolve(result.data);
                    }
                },function(error){
                    console.log(error);
                });
                return deferred.promise;
            }
            function delNews (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl + 'admin/news/'+ id,
                    method: 'DELETE',
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
            function delImageNews (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl + 'pictures/'+ id,
                    method: 'DELETE',
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
	return {
		getNews : getNews,
        addNews:addNews,
        updateNews :updateNews,
        delNews :delNews,
        delImageNews:delImageNews
	};
}])