app = angular.module('app');
app.controller('PostCtrl',[
	'$scope',
	'Auth',
	'$uibModal',
	'toastr',
	'Category',
	'$localStorage',
	'Post',
	'$sce',
	function($scope,Auth,$uibModal,toastr,Category,$localStorage,Post,$sce){
		if(!$localStorage.currentUser){
	        $state.go('login');
	    }
	    var user = $localStorage.currentUser;
	    var currentPage = null;
	    var lastPage = null;
	    $scope.posts =[];
		$scope.openModal = function (){
			// alert(1);
		    var modalInstance = $uibModal.open({
			    templateUrl: 'resources/views/admin/modal/post-modal.html',
			    size: 'lg',
			    controller: 'PostModalCtrl',
		    });

		    modalInstance.result.then(function (post) {
		    	if(post){
		    		$scope.posts.unshift(post);
		    	}
		    }, function () {
		    	console.log('Modal dismissed at: ' + new Date());
		    });
		};
		$scope.getAllPosts = function(page){
			Post.getAllPost(page).then(function(result){
				if(result &&result.success){
					currentPage = result.data.current_page;
					lastPage = result.data.last_page;
					_.each(result.data.data,function(val){
						$scope.posts.push(val);
					})
					
				}
			},function(error){
				console.log(error);
			})
		}
		$scope.getAllPosts(1);
		$scope.getMore = function(){
			if(currentPage < lastPage){
				currentPage++;
				$scope.getAllPosts(currentPage);
			}
		}
		$scope.showInfor = function(caption){
			$scope.caption = caption;
		}
		$scope.showUpdateCaption = false;
		$scope.showInputCaption = function(){
			$scope.showUpdateCaption = true;
		}
		$scope.updateCaption = function(){
			$scope.showUpdateCaption = false;
			Post.updatePost($scope.caption).then(function(result){
				if(result && result.success){
					var index = _.findIndex($scope.posts,function(val){
						return val.id === result.data.id;
					})
					if(index > -1){
						$scope.posts[index].caption = result.data.caption;
					}
					toastr.success('Update post successfully !!!');
				}
			},function(error){
				console.log(error);
			})
		}
		$scope.reset = function(){
			$scope.showUpdateCaption = false;
		}
		$scope.deletePost = function(post){
			Post.deletePost(post).then(function(result){
				if(result && result.success){
					var index = _.findIndex($scope.posts,function(val){
						return val.id === post.id;
					})
					if(index > -1){
						$scope.posts.splice(index, 1);
					}
					toastr.success('Delete post successfully !!!');
				}
			},function(error){
				console.log(result);
			})
		}
		$scope.trustAsHtml = function(value) {
	        return $sce.trustAsHtml(value);
	    };

}]);
app.controller('PostModalCtrl', [
	'$scope',
	'$state',
	'Auth',
	'$rootScope',
	'$uibModalInstance',
	'Upload',
    'toastr',
	'$localStorage',
	'baseurl',
	function($scope,$state,Auth,$rootScope,$uibModalInstance,Upload,toastr,$localStorage,baseurl){
		var user = $localStorage.currentUser;
		$scope.upload = function (dataUrl, name,post) {
	        $scope.dis = true;
	        Upload.upload({
	            url: baseurl + 'admin/posts',
	            data: {
	                picture : Upload.dataUrltoBlob(dataUrl, name),
	                caption : post.caption
	            },
	            headers: {
	            	'Authorization': user.remember_token,
	            },
	        }).then(function (response) {
	        		$uibModalInstance.close(response.data.data);
	                $scope.dis = false;
	                toastr.success('Create post successfully !!!');

	        }, function (error) {
	            console.log(error);
	            toastr.danger('Create post error !!!');
	        });
	    }
		$scope.close = function (){
	        $uibModalInstance.dismiss('cancel');
	    };
		
}]);