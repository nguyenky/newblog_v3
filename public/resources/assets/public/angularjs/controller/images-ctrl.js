app = angular.module('app');
app.controller('ImagesCtrl',[
    '$scope',
    '$rootScope',
    '$http',
    'PublicService',
    '$sce',
    '$state',
    function($scope,$rootScope,$http,PublicService,$sce,$state){
	if($rootScope.loginStatus){
        var friend = $rootScope.userLogin.name;
    }else{
        var friend = 'A friend';
    }
    window.scrollTo(100,100);
    $rootScope.showPosts = false;
    $scope.getPosts = function(){
        PublicService.getAllPosts(1).then(function(result){
            if(result && result.success){
                $scope.currentPage = result.data.current_page;
                $scope.lastPage = result.data.last_page;
                $scope.posts = result.data.data;
                var dataEnter = {
                    content:friend + '  accessed images !!!',
                    type:1
                };
                $scope.insertNoti(dataEnter);
                if($scope.currentPage == $scope.lastPage){
                    $scope.showLoadMore = false;
                }else{
                    $scope.showLoadMore = true;
                }
            }
        },function(errors){
            console.log(errors);
        })
    }
    $scope.getPosts();
    $scope.loadmore = function(){
        if($scope.currentPage == $scope.lastPage){
            $scope.showLoadMore = false;
        }else{
            PublicService.getAllPosts($scope.currentPage+1).then(function(result){
                if(result && result.success){
                    $scope.currentPage = result.data.current_page;
                    $scope.lastPage = result.data.last_page;
                    _.each(result.data.data,function(val){
                        $scope.posts.push(val);
                    });
                    if($scope.currentPage == $scope.lastPage){
                        $scope.showLoadMore = false;
                    }else{
                        $scope.showLoadMore = true;
                    }
                }
            },function(errors){
                console.log(errors);
            })
        }
    }
    $scope.insertNoti = function(data){
        PublicService.insertNoti(data);
    }

}]);
