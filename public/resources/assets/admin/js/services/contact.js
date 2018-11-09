angular.module('app')
	.factory('Contact', [
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
            function getAllContact (){
                var deferred = $q.defer();
                $http({
                    url: baseurl +'admin/getAllContact',
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
            function deleteContact (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl +'admin/deleteContact/'+id,
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
    		getAllContact : getAllContact,
            deleteContact :deleteContact
    	};
}])