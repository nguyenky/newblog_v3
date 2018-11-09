app = angular.module('app');
app.controller('LoginCtrl',[
    '$scope',
    '$rootScope',
    '$http',
    '$state',
    'Auth',
    'baseurl',
    function($scope,$rootScope,$http,$state,Auth,baseurl){
    $scope.isShowError = false;

	$scope.login = function(user){
		Auth.login($scope.user.email, $scope.user.password)
                    .then(function(result) {
                        if(result){
							$state.go('admin.dashboard');
                            $scope.getAvatar();
                        }
                    }, function(error) {
                        if(error && error.data && error.data.message){
                            $scope.isShowError = true;
                            $scope.error = error.data.message;
                        }
                    });
	}
    $scope.getAvatar = function(){
        $http({
                url: baseurl+'getProfile/1',
                method: 'GET',
            }).then(function(result){
                if(result && result.data.success){
                    $rootScope.avatar = result.data.data.url;
                }
            },function(error){
                console.log(error);
            });
    }
}]);