app = angular.module('app');
app.controller('HomeCtrl',[
    '$scope',
    '$rootScope',
    'PublicService',
    '$sce',
    '$state',
    function($scope,$rootScope,PublicService,$sce,$state){
	if($rootScope.loginStatus){
        var friend = $rootScope.userLogin.name;
    }else{
        var friend = 'A friend';
    }
    $rootScope.showPosts = true;
    window.scrollTo(100,100);
    $scope.getNews = function(){
        PublicService.getNews().then(function(result){
            if(result &&result.success){
                angular.forEach(result.data, function(value, key) {
                        switch (value.category_id) {
                            case 1:
                                $scope.life = value;
                                $rootScope.latest.push(value);
                                break;
                            case 2:
                                $scope.chilhood = value;
                                $rootScope.latest.push(value);
                                break;
                            case 3:
                                $scope.trip = value;
                                $rootScope.latest.push(value);
                                break;
                            case 4:
                                $scope.history = value;
                                $rootScope.latest.push(value);
                                break;
                            case 5:
                                $scope.video = value;
                                break;
                            case 6:
                                $scope.music = value;
                                break;
                            case 7:
                                $scope.historyCollected = value;
                                $rootScope.latest.push(value);
                                break;
                            default:
                        }
                });
            }
        },function(errors){
            console.log(errors);
        });
    }
    $scope.getNews();
    $scope.redirec = function(post){
        var name = $scope.vietsub(post.name);
        $state.go('detail', { Id : post.id,Name:name});
    }
    $scope.vietsub = function(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/ /g, "-");
        return str;
    }
    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };
    
    
}]);