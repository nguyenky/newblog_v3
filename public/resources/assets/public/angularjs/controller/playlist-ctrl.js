app = angular.module('app');
app.controller('PlaylistController',[
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
    console.log($rootScope.showPosts);

    $scope.getPosts = function(){
        PublicService.getPlaylists().then(function(result){
            if(result &&result.success){
                $scope.posts = result.data;
                var dataEnter = {
                    content:friend + '  accessed playlist !!!',
                    type:1
                };
                $scope.insertNoti(dataEnter);
            }
        },function(errors){
            console.log(errors);
        });
    }
    $scope.getPosts();
    $scope.insertNoti = function(data){
        PublicService.insertNoti(data);
    }
    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };
}]);
