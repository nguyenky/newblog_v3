app = angular.module('app');
app.controller('PostModalCtrl', [
	'$scope',
	'$state',
	'Auth',
	'$rootScope',
	'$uibModalInstance',
	'Upload',
    'toastr',
	'$localStorage',
	function($scope,$state,Auth,$rootScope,$uibModalInstance,Upload,toastr,$localStorage){
		// $scope.upload = function (dataUrl, name) {
	 //        $scope.dis = true;
	 //        Upload.upload({
	 //            url: 'http://newblog.com/api/uploadAvatar/1',
	 //            data: {
	 //                avatar : Upload.dataUrltoBlob(dataUrl, name),
	 //            },
	 //            headers: {
	 //            	'Authorization': user.remember_token,
	 //            },
	 //        }).then(function (response) {
	 //        		$uibModalInstance.dismiss('cancel');
	 //                $scope.dis = false;
	 //                $rootScope.avatar = response.data;
	 //                $localStorage.currentUser.avatar = response.data;
	 //                toastr.success('Change avatar successfully !!!');

	 //        }, function (error) {
	 //            console.log(error);
	 //            toastr.danger('Change avatar error !!!');
	 //        });
	 //    }
		// $scope.close = function (){
	 //        $uibModalInstance.dismiss('cancel');
	 //    };
		
}]);