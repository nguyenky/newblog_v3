app = angular.module('app');
app.controller('NewsModalController',[
	'$scope',
	'$state',
	'Auth',
	'$rootScope',
	'$uibModalInstance',
    'toastr',
	'baseurl',
	// '$document',
	function($scope,$state,Auth,$rootScope,$uibModalInstance,toastr,baseurl ){
	var getAccessToken = Auth.getAccessToken();
	if(!getAccessToken && !$rootScope.token){
		$state.go('login');
	}
	console.log(getAccessToken);
	
	$scope.upload = function (dataUrl, name) {
        $scope.dis = true;
        Upload.upload({
            url: baseurl+'admin/uploadAvatar/1',
            data: {
                avatar : Upload.dataUrltoBlob(dataUrl, name),
            },
            headers: {
            	'Authorization': getAccessToken,
            },
        }).then(function (response) {
        		$uibModalInstance.dismiss('cancel');
                $scope.dis = false;
                $rootScope.avatar = response.data;
                toastr.success('Change avatar successfully !!!');

        }, function (error) {
            console.log(error);
            toastr.danger('Change avatar error !!!');
        });
    }
    $scope.close = function (){
        $uibModalInstance.dismiss('cancel');
    };
}]);