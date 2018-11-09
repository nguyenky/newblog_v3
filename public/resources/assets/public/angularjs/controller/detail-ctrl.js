app = angular.module('app');
app.controller('DetailCtrl',[
    '$scope',
    '$rootScope',
    '$http',
    'PublicService',
    '$sce',
    '$stateParams',
    'baseurl',
    function($scope,$rootScope,$http,PublicService,$sce,$stateParams,baseurl){
	if($rootScope.loginStatus){
        var friend = $rootScope.userLogin.name;
    }else{
        var friend = 'A friend';
    }
    window.scrollTo(100,100);
    // if($localStorage.currentUser){
    //     $rootScope.avatar = $localStorage.currentUser.avatar;
    // }
    $rootScope.showPosts = false;

    // console.log($stateParams);
    $scope.likes = false;
    $scope.comment = null;
    $scope.getPost = function(id){
        PublicService.getNew(id).then(function(result){
            if(result &&result.success){
                $scope.post = result.data;
                // $scope.slides = result.data.images;
                // console.log(result.data);
                $scope.hasImage();
                var dataEnter = {
                    content:friend + '  accessed your post - '+result.data.name+' !!!',
                    type:1
                };
                $scope.insertNoti(dataEnter);
            }
        },function(errors){
            console.log(errors);
        });
    }
    $scope.getPost($stateParams.Id);
    
    $scope.like = function(id){
        // $scope.like = true;
        if($scope.likes){
            $scope.post.likes--;
            PublicService.unLike(id);
            $scope.likes = false;
            var dataEnter = {
                content:friend + ' unliked your post - '+$scope.post.name,
                type:4,news_id:$scope.post.id
            };
            $scope.insertNoti(dataEnter);
        }else{
            $scope.post.likes++;
            PublicService.like(id);
            $scope.likes = true;
            var dataEnter = {
                content:friend + ' liked your post - '+$scope.post.name,
                type:4,
                news_id:$scope.post.id
            };
            $scope.insertNoti(dataEnter);
        }
        
    }
    $scope.pushComment = function(){
        // console.log($scope.comment);Your
        if($rootScope.loginStatus){
            $scope.comment.name = $rootScope.userLogin.name;
            $scope.comment.avatar = $rootScope.userLogin.avatar;
        }else{
            $scope.comment.avatar = null;
        }
        
        if(!$scope.comment.name | !$scope.comment.content){
            alert('Please enter your message :) !!!');
            $scope.allowCMT = false;
        }else{
            $scope.allowCMT = true;
        }
        $scope.comment.news_id = $scope.post.id;
        if($scope.allowCMT){
            PublicService.createComment($scope.comment).then(function(result){
                if(result && result.success){
                    $scope.post.comments.push($scope.comment);
                    $scope.comment = {};
                    var dataEnter = {
                        content:friend + ' commented on your post - '+$scope.post.name,
                        type:3,
                        news_id:$scope.post.id
                    };
                    $scope.insertNoti(dataEnter);
                }
            },function(errors){
                console.log(errors);
                $scope.comment = {};
            })
        }
        
        
    }
    $scope.insertNoti = function(data){
        PublicService.insertNoti(data);
    }
    
    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };
    //---------------------------------------
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function(image) {
        var newWidth = 600 + slides.length + 1;
        slides.push({
          image: image.url,
          id: currIndex++
        });
    };

    // $scope.randomize = function() {
    //     var indexes = generateIndexesArray();
    //     assignNewIndexesToSlides(indexes);
    // };
    $scope.hasImage = function(){
        angular.forEach($scope.post.images, function(value, key) {
            $scope.addSlide(value);
        });
    }
}]);
