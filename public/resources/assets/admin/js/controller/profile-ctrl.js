app = angular.module('app',['ui.bootstrap','ngFileUpload', 'ngImgCrop']);
app.controller('ProfileController',[
	'$scope',
	'$state',
	'Auth',
	'$rootScope',
	'$uibModal',
	'Upload',
	'baseurl',
	'Profile',
	'toastr',
	'$localStorage',
function($scope,$state,Auth,$rootScope,$uibModal,Upload,baseurl,Profile,toastr,$localStorage){
	if(!$localStorage.currentUser){
		$state.go('login');
	}
	var user = $localStorage.currentUser;
	$scope.getProfile = function(id){
		Profile.getProfile(id).then(function(result){
			if(result && result.success){
				$scope.profile = result.data;
				$scope.edit = true;
			}
		},function(error){
			console.log(error);
			$scope.edit = false;
		});
	}
	if(user){
		$scope.getProfile(user.id);
	}
    $scope.save = function(profile){
    	if($scope.edit){
    		Profile.updateProfile(profile).then(function(result){
    			if(result && result.success){
    				$scope.profile = result.data;
    				toastr.success('Update profile successfully !!!');
    			}
    		},function(error){
    			console.log(data);
    				toastr.danger('Update profile error !!!');

    		});
    	}
    }
	$scope.openAnimalModal = function (){
		    var modalInstance = $uibModal.open({
			    templateUrl: 'resources/views/admin/modal/upload-avatar-modal.html',
			    controller: 'UploadAvatarController',
		    });
		};
	$scope.getUser = function(){
		Profile.getUser().then(function(result){
			if(result && result.success){
				$scope.userAdmin = _.omit(result.data,'password');
				// $scope.userAdmin = result.data;
			}
		},function(error){
			console.log(error);
		})
	}
	$scope.getUser();
	$scope.updateAdmin = function(){
		console.log($scope.userAdmin);
		Profile.updateUser($scope.userAdmin).then(function(result){
			if(result && result.success){
				$scope.userAdmin = _.omit(result.data,'password');
				toastr.success('Update user successfully !!!');
			}
		},function(error){
			console.log(error);
		})
	}
}]);