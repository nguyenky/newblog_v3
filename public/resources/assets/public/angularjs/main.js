app = angular.module('app');
app.controller('MyAppCtrl',[
    '$scope',
    '$rootScope',
    '$http',
    'PublicService',
    '$sce',
    'Facebook',
    '$localStorage',
    '$state',
    function($scope,$rootScope,$http,PublicService,$sce,Facebook,$localStorage,$state){
	$scope.contact= null;
    if($localStorage.userLogin){
        $rootScope.userLogin = $localStorage.userLogin;
        $rootScope.loginStatus = true;
        var friend = $localStorage.userLogin.name;
    }else{
        $rootScope.userLogin = {
            id:null,
            name:null,
            avatar:null
        }
        $rootScope.loginStatus = false;
        var friend = 'A fiend';

    }
    // window.scrollTo(100,100);
    $scope.searchWord = null;
    $scope.showSearch = false;
    $scope.loadingSearch = false;
    $scope.logout = function(){
        var data ={
            content:friend + ' has logout !!!',
            type:2
        } 
        $scope.insertNoti(data);
        delete $localStorage.userLogin;
        $rootScope.userLogin = {
            id:null,
            name:null,
            avatar:null
        };
        $rootScope.userLogin = null;
        $rootScope.loginStatus = false;
    }
    $scope.login = function() {

      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        $scope.me();
      });
    };
    $scope.me = function() {
      Facebook.api('/me', function(response) {
        if(!response.error){
            $rootScope.userLogin = response;
            $localStorage.userLogin = response;
            $rootScope.loginStatus = true;
            friend = response.name;
            var data ={
                content:friend + ' has login !!!',
                type:2
            } 
            $scope.insertNoti(data);
        }
        
      });
      Facebook.api('/me/picture?width=90&height=90', function(response) {
        if(!response.error){
            $rootScope.userLogin.avatar = response.data.url;
            $localStorage.userLogin.avatar = response.data.url
            console.log(response);
        }
        
      });

      
    };
    $rootScope.latest = [];
    $scope.getPosts = function(){
        PublicService.getPosts().then(function(result){
            if(result &&result.success){
                $rootScope.postMain = result.data[0];
                $rootScope.postExtra1 = result.data[1];
                $rootScope.postExtra2 = result.data[2];
                $rootScope.postExtra3 = result.data[3];
                $rootScope.demo = result.data;
            }
        },function(errors){
            console.log(errors);
        });
    }
    $scope.getPosts();
    $scope.getProfile = function(){
        PublicService.getProfile().then(function(result){
            if(result &&result.success){
                $rootScope.profile = result.data;
            }
        },function(errors){
            console.log(errors)
        })
    }
    $scope.getProfile();
    $scope.countCategory = function(){
        PublicService.countCategory().then(function(result){
            if(result &&result.success){
                $rootScope.categories = _.filter(result.data,function(val){
                    return val.id != 5 && val.id !=6; 
                })
            }
        },function(errors){
            console.log(errors)
        })
    }
    $scope.getProfile();
    $scope.countCategory();
    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };
    $scope.getInstagram = function(){
        PublicService.getInstagram().then(function(result){
            if(result && result.success){
                $rootScope.instagrams = result.data.data;
            }
        },function(errors){
            console.log(errors);
        })
    }
    $scope.getInstagram();
    $scope.search = function(page){
        $scope.searchNews =[];
        $scope.loadingSearch = true;
        if($scope.searchWord){
            $scope.showSearch = true;
            PublicService.search($scope.searchWord,page).then(function(result){
                if(result && result.success){
                    $scope.currentPageSearch = result.data.current_page;
                    $scope.lastPageSearch = result.data.last_page;
                    if(result.data.current_page < result.data.last_page){
                        $scope.hasLoadMoreSearch = true;
                    }else{
                        $scope.hasLoadMoreSearch = false;
                    }
                    if(result.data.current_page > 1){
                        $scope.hasPrevius = true;
                    }else{
                        $scope.hasPrevius = false;
                    }
                    angular.forEach(result.data.data, function(value, key) {
                        $scope.searchNews.push(value);
                    });
                    $scope.loadingSearch = false;
                }
            },function(errors){
                console.log(errors);
                $scope.loadingSearch = false;
            })
        }
    }
    $scope.loadMore = function(){

        $scope.search($scope.currentPageSearch+1);
    }
    $scope.previus = function(){
        $scope.search($scope.currentPageSearch-1);
    }
    $scope.insertNoti = function(data){
        PublicService.insertNoti(data);
    }
    var dataEnter = {
        content:friend + ' visited your page !!!',
        type:1
    };
    $scope.insertNoti(dataEnter);
    // $scope.getLocation = function() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function (position){
    //                 mysrclat = position.coords.latitude; 
    //               mysrclong = position.coords.longitude;
    //               console.log(mysrclat);
    //               console.log(mysrclong);
    //         });
    //     }
    // }

    // $scope.getLocation();
    $scope.redirecSite = function(site){
        $state.go('detail', { Id : post.id,Name:name});
    }
    $scope.redirec = function(post){
        var name = $scope.vietsub(post.name);
        $state.go('detail', { Id : post.id,Name:name});
    }
    $scope.vietsub = function(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/ /g, "-");
        return str;
    }
    
    $scope.redirectCategory = function(category){
        var name = $scope.vietsub(category.name);
        $state.go('site', { Id : category.id,Name:name});
    }
    // Contact
    $scope.errorContact = false;
    $scope.successContact = false;
    $scope.sendContact = function(){
        if(!$scope.contact.name || !$scope.contact.email || !$scope.contact.message){
            $scope.errorContact = true;
        }else{
            $scope.errorContact = false;
            PublicService.createContact($scope.contact).then(function(result){
                if(result && result.success){
                    $scope.successContact = true;
                    $scope.contact= null;
                }
            },function(error){
                console.log(error);
            })
        }
    }
    
}]);
// app.constant('baseurl', 'http://localhost/newBlog/api/')
// app.constant('baseurl', 'http://yesforme.esy.es/api/')
app.constant('baseurl', 'http://kyln.dev.com/api/')