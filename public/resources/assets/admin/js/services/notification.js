angular.module('app')
	.factory('Notification', [
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
            function getNewNotification (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/getNewNotification',
                    method: 'GET',
                    headers: {
                        'Authorization': $localStorage.currentUser.remember_token,
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
            function checkAll (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/checkAll',
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
            function getAllNotification (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/getAllNotification',
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
            function deleteNoti (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/delete/' +id,
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
            function clear (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/clear',
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
            function getComments (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/getComments',
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
            function updateComment (data){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/updateComment/' +data.id,
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
            function deleteComment (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/deleteComment/' +id,
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
        getNewNotification:getNewNotification,
        checkAll:checkAll,
        getAllNotification:getAllNotification,
        deleteNoti:deleteNoti,
        clear:clear,
        getComments:getComments,
        updateComment:updateComment,
        deleteComment:deleteComment

	};
}])