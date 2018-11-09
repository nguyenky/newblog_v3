angular.module('app')
	.factory('Profile', [
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
            function getProfile (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl +'getProfile/' +id,
                    method: 'GET',
                    headers: {
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
            function getUser (){
                var deferred = $q.defer();
                $http({
                    url: baseurl +'admin/users/1',
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
            function updateProfile (profiles){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/profiles/' +profiles.id,
                    method: 'PUT',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data: profiles,
                }).then(function(result){
                    if(result && result.data.success){
                        deferred.resolve(result.data);
                    }
                },function(error){
                    console.log(error);
                });
                return deferred.promise;
            }
            function updateUser (user){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/users/1',
                    method: 'PUT',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data: user,
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
    		getProfile : getProfile,
            updateProfile :updateProfile,
            getUser:getUser,
            updateUser:updateUser
    	};
}])