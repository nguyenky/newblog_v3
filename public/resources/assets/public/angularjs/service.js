angular.module('app')
	.factory('PublicService', [
        '$http',
        'baseurl',
        '$q',
        function($http,baseurl,$q){
            function getPosts (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getPostPublic',
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
            function getNews (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getNewsPublic',
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
            // user_id = 2293866932
            //access_token = 2293866932.1677ed0.5fb0088e7ad44161a69a2de237d04fa7
            function getInstagram (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getInstagram',
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*'
                        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept"
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
            function getNew (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getNewDetail/'+id,
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
            function like (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/like/'+id,
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
            function unLike (id){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/unlike/'+id,
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
            function getProfile (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'getProfile/1',
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
            function countCategory (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getCategory',
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
            function getNewsSite (id,page){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getNewsSite/' +id + '?page=' +page,
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
            function createComment (comment){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/comments',
                    method: 'POST',
                    data:comment,
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
            function search (search,page){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/search/' +search + '?page=' + page,
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
            function insertNoti (data){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/insertNoti',
                    method: 'POST',
                    data:data,
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
            function getPlaylists (){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getPlaylists',
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
            function createContact (data){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/createContact',
                    method: 'POST',
                    data:data,
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
            function getAllPosts (page){
                var deferred = $q.defer();
                $http({
                    url: baseurl+'public/getAllPosts?page=' +page,
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
	return {
        getPosts:getPosts,
        getNews:getNews,
        getInstagram:getInstagram,
        getNew:getNew,
        like:like,
        unLike:unLike,
        getProfile:getProfile,
        countCategory:countCategory,
        getNewsSite:getNewsSite,
        createComment:createComment,
        search:search,
        insertNoti:insertNoti,
        getPlaylists:getPlaylists,
        createContact:createContact,
        getAllPosts:getAllPosts
	};
}])