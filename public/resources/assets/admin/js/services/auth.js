angular.module('app')
	.factory('Auth', [
        '$http',
        '$q',
        '$window',
        '$state',
        '$rootScope',
        'baseurl',
        '$localStorage',
        function($http,$q,$window,$state,$rootScope,baseurl,$localStorage){
        	function login (email, password){
                    var deferred = $q.defer();
                    $http({
                        url: baseurl+'auths/login',
                        method: 'POST',
                        data: {
                            email: email,
                            password: password
                        }
                    }).then(function(result) {
                        if(result && result.data && result.data.success && result.data.data){
                            $localStorage.currentUser = result.data.data;
                            deferred.resolve(result.data.data);
                        }else{
                            deferred.reject(result);
                        }
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

            function logout(){
                delete $localStorage.currentUser;
            	$state.go('login');
            }
        	return {
        		login : login,
        		logout : logout,
        	};
}])