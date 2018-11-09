app = angular.module('app',[
	'angularUtils.directives.dirPagination',
	'ngSanitize',
	'ui.select',
	'ngFileUpload',
	'ngImgCrop',
	'summernote',
	'ngSanitize',
	'thatisuday.dropzone',
	]);
app.controller('NewsController',[
	'$scope',
	'Auth',
	'$uibModal',
	'toastr',
	'Category',
	'News',
	'_',
	'$sce',
	'$state',
	'$localStorage',
	'Upload',
	'baseurl',
function($scope,Auth,$uibModal,toastr,Category,News,_,$sce,$state,$localStorage,Upload,baseurl){
	if(!$localStorage.currentUser){
        $state.go('login');
    }
    var user = $localStorage.currentUser;
    var idUpload = null;
	$scope.showItem = 10;
	$scope.getNews = function(){
		News.getNews().then(function(result){
			if(result && result.success){
				$scope.news = result.data;
				$scope.newsFilter = result.data;
			}
		},function(error){
			console.log(error);
		});
	}
	$scope.getNews();
	$scope.create = false;
	$scope.edit = false;
	$scope.isCropMain = false;
	$scope.isCropMulti = false;
	$scope.multi ={};
	$scope.showEdit = function(post){
		$scope.new = post;
		$scope.edit = true;
		idUpload = post.id;
	}
	$scope.close = function(){
		$scope.edit = false;
		$scope.create = false;

	}
	$scope.showCreate = function(){
		$scope.create = true;
	}
	$scope.showCrop = function(){
		if($scope.isCropMain){
			$scope.isCropMain = false;
		}else{
			$scope.isCropMain = true;
		}
		
	}

	$scope.getAllCategoryTreeView = function(){
		Category.getAllCategoryTreeView().then(function(result){
			if(result && result.success){
				$scope.categories = result.data;
				

			}
		},function(error){
			console.log(error);
		});
	}

	$scope.getAllCategoryTreeView();
	//--------------END GET CATEGORY-------
	$scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };
	///---------CREATE-----------

	$scope.save = function(dataUrl,name,post){
		var item = angular.copy(_.omit(post,'category'));
		item.category_id = post.category.id;
		if(dataUrl){
			item.picture = Upload.dataUrltoBlob(dataUrl, name);
		}
        Upload.upload({
            url: baseurl+'admin/addNews',
            data: item,
            headers: {
            	'Authorization': user.remember_token,
            },
        }).then(function (result) {
        	if(result.data && result.data.success){
        		result.data.data.url = dataUrl;
        		result.data.data.category = post.category;
        		$scope.newsFilter.unshift(result.data.data);
        		$scope.create = false;
        		toastr.success('Change avatar successfully !!!','Success !!');
        		$scope.post = null;
        	}
        }, function (error) {
            console.log(error);
            toastr.danger('Change avatar error !!!');
        });
	}
	///---------END CREATE------
	// BEGIN UPDATE News
	$scope.updateNews= function(dataUrl,name){
		// console.log($scope.new);
		var item = angular.copy(_.omit($scope.new,'likes','display','category'));
			item.category_id = $scope.new.category.id;
			if(dataUrl){
				item.file = Upload.dataUrltoBlob(dataUrl, name);
			}
		Upload.upload({
            url: baseurl+'admin/updateNews/'+item.id,
            data: item,
            headers: {
            	'Authorization': user.remember_token,
            },
        }).then(function (result) {
        	if(result.data && result.data.success){
        		var index = _.findIndex($scope.newsFilter,function(val){
        			return val.id == result.data.data.id;
        		});
        		$scope.newsFilter[index].url = result.data.data.url;
        		$scope.edit = false;
        		toastr.success('Update news successfully !!!','Success !!');
        	}
        }, function (error) {
            console.log(error);
            toastr.danger('Change avatar error !!!');
        });
	}
	$scope.delNews = function(){
		News.delNews($scope.new.id).then(function(result){
			if(result && result.success){
				var index = _.findIndex($scope.newsFilter,function(val){
					return val.id == result.data;
				})
				if(index > -1){
					$scope.newsFilter.splice(index, 1);
				}
				$scope.edit = false;
        		toastr.success('Delete news successfully !!!','Success !!');
			}
		},function(error){
			console.log(error);
		})
	}
	// Modal
	// $scope.showMulti = false;
	// if($scope.showMulti){
		// alert(1);
	// }
	$scope.openModal = function (){
	    var modalInstance = $uibModal.open({
		    templateUrl: 'resources/views/admin/modal/multiupload.html',
		    controller: 'MultiUploadController',
		    resolve: {
		        post: $scope.new
		    },
		    size:'lg'
	    });
	    modalInstance.result.then(function (images) {
	    	if(images){
	    		// $scope.categories.unshift(images);
	    		console.log(images);
	    	}
	    }, function () {
	    	console.log('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.noFilter = function(){
		$scope.newsFilter = $scope.news;
	}
	//summernote
}]);
app.controller('MultiUploadController',[
	'$scope',
	'baseurl',
	'post',
	'News',
	function($scope,baseurl,post,News){
		if(post.images){
			$scope.images = post.images;
		}else{
			$scope.images = null;
		}
		console.log(post);
		$scope.name = 'uchiha';
		$scope.dzOptions = {
			url : baseurl+'uploadImage/'+ post.id,
			paramName : 'photo',
			maxFilesize : '10',
			paramName: "image",
			acceptedFiles : 'image/jpeg, images/jpg, image/png',
			addRemoveLinks : true,
		};
		
		
		//Handle events for dropzone
		//Visit http://www.dropzonejs.com/#events for more events
		$scope.dzCallbacks = {
			'addedfile' : function(file){
				console.log(file);
				$scope.newFile = file;
			},
			'success' : function(file, xhr){
				console.log(file, xhr);
				$scope.images.push(xhr.data);
			},
		};
		
		
		//Apply methods for dropzone
		//Visit http://www.dropzonejs.com/#dropzone-methods for more methods
		$scope.dzMethods = {};
		$scope.removeNewFile = function(){
			$scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
		}
		$scope.delImage = function(image){
			News.delImageNews(image.id).then(function(result){
				if(result && result.success){
					var index = _.findIndex($scope.images,function(val){
					return val.id == result.data;
					})
					if(index > -1){
						$scope.images.splice(index, 1);
					}
				}
			});
		}

}]);