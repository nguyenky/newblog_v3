app = angular.module('app',['angularUtils.directives.dirPagination']);
app.controller('CategoryController',[
	'$scope',
	'Auth',
	'$uibModal',
	'toastr',
	'Category',
	'$localStorage',
	function($scope,Auth,$uibModal,toastr,Category,$localStorage){
		if(!$localStorage.currentUser){
	        $state.go('login');
	    }
	    var user = $localStorage.currentUser;
		$scope.showItem = 10;
		$scope.getCategories = function(){
			Category.getCategories().then(function(result){
				if(result && result.success){
					$scope.categories = result.data;
					console.log($scope.categories);
					$scope.edit = true;
				}
			},function(error){
				console.log(error);
				$scope.edit = false;
			});
		}

		$scope.getCategories();
		
		$scope.show = false;
		$scope.showFilter =function(){
			// alert(32423);
			if($scope.show){
				$scope.show = false;
			}else{
				$scope.show = true;
			}
			
		}
		$scope.update = function(category){
			Category.updateCategory(category).then(function(result){
				if(result && result.success){

				}
			},function(error){
				console.log(error);
			})
		}
		$scope.showModal = function (category){
			    var modalInstance = $uibModal.open({
				    templateUrl: 'resources/views/admin/modal/category-modal.html',
				    controller: 'CategoryModalCtrl',
				    resolve: {
				        category: category
				    }
			    });
			    modalInstance.result.then(function (category) {
			    	if(category){
			    		$scope.categories.unshift(category);
			    	}
			    }, function () {
			    	console.log('Modal dismissed at: ' + new Date());
			    });
			};
		$scope.startFilter = function(value){
			alert(value);
		}
		$scope.delete = function(category){
			Category.deleteCategory(category).then(function(result){
				if(result && result.success){
					var index = _.findIndex($scope.categories,function(val){
						return val.id === category.id;
					})
					if(index > -1){
						$scope.categories.splice(index,1);
					}
				}else{
					toastr.danger('Category cant delete!!!','Danger !!');
				}
			},function(error){
				console.log(error);
				toastr.danger('Category cant delete!!!','Danger !!');
			})
		}


}]);
app.controller('CategoryModalCtrl',[
	'$scope',
	'Auth',
	'$uibModalInstance',
	'toastr',
	'Category',
	'$localStorage',
	'category',
	function($scope,Auth,$uibModalInstance,toastr,Category,$localStorage,category){
		if(!$localStorage.currentUser){
	        $state.go('login');
	    }
	    if(category){
	    	$scope.edit = true;
	    	$scope.category = category;
	    }else{
	    	$scope.edit = false;
	    	$scope.category = null;
	    }
	    var user = $localStorage.currentUser;
	    $scope.getCategories = function(){
	    	Category.getAllCategoryTreeView().then(function(result){
	    		if(result && result.success){
	    			$scope.categories = result.data;
	    			if($scope.edit){
	    				$scope.categories.unshift({
	    					name:'No parent category',
	    					id: null
	    				});
	    			}
	    		}
	    	},function(error){
	    		console.log(error);
	    	})
	    }
	    $scope.getCategories();
	    $scope.save = function(){
	    	var cat = angular.copy(_.omit($scope.category,'has_parent'));
	    	if($scope.category.has_parent){
	    		cat.category_id = $scope.category.has_parent.id;
	    	}
	    	if($scope.edit){
	    		Category.updateCategory(cat).then(function(result){
	    			if(result && result.success){
	    				var dataCatogory = result.data;
		    				if($scope.category.has_parent){
					    		dataCatogory.has_parent = $scope.category.has_parent;
					    	}
		    			$uibModalInstance.close(dataCatogory);
	    			}
	    		},function(error){
	    			console.log(error);
	    		});
	    	}else{
	    		Category.createCategory(cat).then(function(result){
		    		if(result && result.success){
		    			var dataCatogory = result.data;
		    				if($scope.category.has_parent){
					    		dataCatogory.has_parent = $scope.category.has_parent;
					    	}
		    			$uibModalInstance.close(dataCatogory);
		    		}
		    	},function(error){
		    		console.log(error);
		    	});
	    	}
	    	
	    }
	    $scope.close = function (){
	        $uibModalInstance.dismiss('cancel');
	    };

}]);