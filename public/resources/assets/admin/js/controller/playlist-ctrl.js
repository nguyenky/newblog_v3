app = angular.module('app');
app.controller('PlaylistCtrl',[
	'$scope',
	'Auth',
	'$uibModal',
	'toastr',
	'$localStorage',
	'Playlist',
	'$sce',
	function($scope,Auth,$uibModal,toastr,$localStorage,Playlist,$sce){
		if(!$localStorage.currentUser){
	        $state.go('login');
	    }
	    var user = $localStorage.currentUser;
	    $scope.getPlaylists = function(){
	    	Playlist.getPlaylists().then(function(result){
	    		if(result && result.success){
	    			$scope.playlists = result.data;
	    		}
	    	},function(errors){
	    		console.log(errors);
	    	})
	    }
	    $scope.getPlaylists();
	    	$scope.show = false;
	    $scope.showPlaylist = function(playlist){
	    	
	    	if(playlist){
	    		$scope.edit = true;
	    		$scope.playlist = playlist;
	    	}else{
	    		$scope.edit = false;
	    		$scope.playlist = null;
	    	}
	    	$scope.show = true;
	    }
	    $scope.cancel = function(){
	    	$scope.playlist = null;
	    	$scope.show = false;
	    }
	    $scope.save = function(){
	    	if($scope.edit){
	    		Playlist.updatePlaylist($scope.playlist).then(function(result){
		    		if(result && result.success){
		    			// $scope.playlists = result.data;
		    			$scope.playlist = null;
		    			$scope.show = false;
		    			var index = _.findIndex($scope.playlists,function(val){
		    				return val.id == result.data.id
		    			})
		    			if(index > -1){
		    				$scope.playlists[index] = result.data;
		    			}
		    			console.log(result.data);
		    		}
		    	},function(errors){
		    		console.log(errors);
		    	})
	    	}else{
	    		Playlist.createPlaylist($scope.playlist).then(function(result){
		    		if(result && result.success){
		    			// $scope.playlists = result.data;
		    			$scope.playlist = null;
		    			$scope.show = false;
		    			$scope.playlists.unshift(result.data);
		    			console.log(result.data);
		    		}
		    	},function(errors){
		    		console.log(errors);
		    	})
	    	}
	    	
	    }
	    $scope.deletePlaylist = function(playlist){
	    	Playlist.deletePlaylist(playlist).then(function(result){
	    		if(result && result.success){
	    			var index = _.findIndex($scope.playlists,function(val){
	    				return val.id == result.data
	    			})
	    			if(index > -1){
	    				$scope.playlists.splice(index, 1);
	    			}
	    		}
	    	},function(errors){
	    		console.log(errors);
	    	})
	    }
		$scope.trustAsHtml = function(value) {
	        return $sce.trustAsHtml(value);
	    };

}]);