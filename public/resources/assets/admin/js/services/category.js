angular.module('app')
	.factory('Category', [
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
            function getCategories (id){
                    var deferred = $q.defer();
                    $http({
                        url: baseurl+'admin/getAllCategory',
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

            function getAllCategoryTreeView (id){
                    var deferred = $q.defer();
                    $http({
                        url: baseurl+'admin/getAllCategoryTreeView',
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
            function createCategory (category){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/categories',
                    method: 'POST',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data: category
                }).then(function(result){
                    if(result && result.data.success){
                        deferred.resolve(result.data);
                    }
                },function(error){
                    console.log(error);
                });
                return deferred.promise;
            }
            function updateCategory (category){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/categories/'+category.id ,
                    method: 'PUT',
                    headers: {
                        'Authorization': user.remember_token,
                        'Content-Type': 'application/json'
                    },
                    data:category
                }).then(function(result){
                    if(result && result.data.success){
                        deferred.resolve(result.data);
                    }
                },function(error){
                    console.log(error);
                });
                return deferred.promise;
            }
            function deleteCategory (category){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'admin/categories/'+category.id ,
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
		getCategories : getCategories,
        getAllCategoryTreeView :getAllCategoryTreeView,
        updateCategory:updateCategory,
        deleteCategory:deleteCategory,
        createCategory:createCategory
	};
}])