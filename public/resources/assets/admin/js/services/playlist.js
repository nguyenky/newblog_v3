angular.module('app')
	.factory('Playlist', [
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
            function getPlaylists (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/playlists',
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
            function createPlaylist (data){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/playlists',
                    method: 'POST',
                    data:data,
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
            function updatePlaylist (data){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/playlists/'+data.id,
                    method: 'PUT',
                    data:data,
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
            function deletePlaylist (data){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/playlists/'+data.id,
                    method: 'DELETE',
                    data:data,
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
		getPlaylists : getPlaylists,
        updatePlaylist:updatePlaylist,
        createPlaylist:createPlaylist,
        deletePlaylist:deletePlaylist
	};
}])