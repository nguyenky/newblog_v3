app = angular.module('app',['angularUtils.directives.dirPagination']);
app.controller('ContactCtrl',[
	'$scope',
	'Auth',
	'toastr',
	'Contact',
	'$localStorage',
	'$state',
	function($scope,Auth,toastr,Contact,$localStorage,$state){
		if(!$localStorage.currentUser){
	        $state.go('login');
	    }
	    var user = $localStorage.currentUser;
		$scope.showItem = 10;
		$scope.getContact = function(){
			Contact.getAllContact().then(function(result){
				if(result && result.success){
					$scope.contacts = result.data;
				}
			},function(error){
				console.log(error);
			})
		}
		$scope.getContact();
		$scope.delete = function(contact){
			Contact.deleteContact(contact.id).then(function(result){
				if(result && result.success){
					var index = _.findIndex($scope.contacts,function(val){
						return val.id == contact.id;
					})
					if(index > -1){
						$scope.contacts.splice(index, 1);
					}
				}
			},function(error){
				console.log(error);
			})
		}
}]);
