app = angular.module('app');
app.controller('MyAppCtrl',[
    '$scope',
    '$rootScope',
    'Auth',
    '$http',
    '$localStorage',
    function($scope,$rootScope,Auth,$http,$localStorage){
	$rootScope.name ="uchiha";
	$scope.logout = function(){
		Auth.logout();
	}
    if($localStorage.currentUser){
        $rootScope.avatar = $localStorage.currentUser.avatar;
    }
    
    
}]);
// app.constant('baseurl', 'http://yesforme.esy.es/api/')
app.constant('baseurl', 'http://kyln.dev.com/api/')