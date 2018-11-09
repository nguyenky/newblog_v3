app = angular.module('app',[
	'angularUtils.directives.dirPagination',
	'ui.bootstrap'
	]);
app.controller('DashboardCtrl',[
	'$scope',
	'$state',
	'Auth',
	'$rootScope',
	'$uibModal',
	'$localStorage',
	'Notification',
	'toastr',
	function($scope,$state,Auth,$rootScope,$uibModal,$localStorage,Notification,toastr){
		if(!$localStorage.currentUser){
			$state.go('login');
		}
		var user = $localStorage.currentUser;
		$scope.getNoti = function(){
			Notification.getNewNotification().then(function(result){
				if(result && result.success){
					$scope.notifications = result.data;
					$rootScope.countNoti = result.data.length;
				}
			},function(errors){
				console.log(errors);
			})
		}
		$scope.getNoti();
		$scope.check = function(){
			Notification.checkAll().then(function(result){
				if(result && result.success){
					$scope.notifications = null;
					$rootScope.countNoti = 0;
				}	
			});
		}
		$scope.getAllNotification = function(){
			Notification.getAllNotification().then(function(result){
				if(result && result.success){
					$scope.fullNotification = result.data;
				}
			},function(errors){
				console.log(errors);
			})
		}
		$scope.deleteNoti = function(id){
			Notification.deleteNoti(id).then(function(result){
				if(result && result.success){
					var index = _.findIndex($scope.fullNotification,function(val){
						return val.id === id
					})
					if(index >-1){
						$scope.fullNotification.splice(index, 1);
					}
					toastr.success('Delete notification successfully !!!','Success !!');
				}	
			})
		}
		$scope.clear =function(result){
			Notification.clear().then(function(result){
				if(result && result.success){
					$scope.fullNotification= null;
				}
			});
		}
		$scope.getComments = function(){
			Notification.getComments().then(function(result){
				if(result && result.success){
					$scope.comments = result.data;
					console.log(result.data);
				}
			},function(errors){
				console.log(errors);
			})
		}
		$scope.comment = null;
		$scope.editComment = function(comment){
			$scope.comment = comment;
		}
		$scope.updateComment = function(){
			if(!$scope.comment.content){
				toastr.warning('Content not null !!!','Warning !!');
			}else{
				Notification.updateComment(_.omit($scope.comment,'news')).then(function(result){
					if(result && result.success){
						var index = _.findIndex($scope.comments,function(val){
							return val.id === result.data.id;
						})
						if(index > -1){
							$scope.comments[index] = $scope.comment;
						}
						$scope.comment = null;
						toastr.success('Update comment successfully !!!','Success !!');

					}
				});
			}
			
		}
		$scope.close = function(){
			$scope.comment = null;
		}
		$scope.deleteComment = function(id){
			Notification.deleteComment(id).then(function(result){
				if (result && result.success) {
					var index = _.findIndex($scope.comments,function(val){
						return val.id == result.data
					})
					if(index >-1){
						$scope.comments.splice(index, 1);
					}
					toastr.success('Delete comment successfully !!!','Success !!');
				}
			});
		}

}]);