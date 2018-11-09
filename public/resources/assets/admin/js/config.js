var app = angular.module('app');

app.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function($stateProvider, $urlRouterProvider,$ocLazyLoadProvider) {
    
    $urlRouterProvider
        .when('/admin','/admin/dashboard')
        .otherwise('/admin/dashboard');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('admin',{
        	url : '/admin',
        	templateUrl: 'resources/views/admin/blocks/admin.html'

        })
        .state('login',{
        	url : '/login',
        	templateUrl: 'resources/views/admin/site/login.html',
            controller :'LoginCtrl',
            resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    // 'resources/assets/admin/js/controller/dashboard-ctrl.js'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'resources/assets/admin/js/controller/login-ctrl.js'
                                    ]);
                                });
                        }]
                    }
        })
        .state('admin.dashboard',{
        	url : '/dashboard',
        	templateUrl :'resources/views/admin/site/dashboard.html',
            controller :'DashboardCtrl',
            resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'paginate',
                                    'toastr',
                                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'resources/assets/admin/js/controller/dashboard-ctrl.js'
                                        
                                    ]);
                                });
                        }]
                    }
        })
        .state('admin.profile',{
            url : '/profile',
            templateUrl :'resources/views/admin/site/profile.html',
            controller :'ProfileController',
            resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'uiboostrap',
                                    'cropimage',
                                    'toastr',
                                    'resources/assets/admin/js/controller/modalCtrl/upload-avatar-modal-ctrl.js',
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'resources/assets/admin/js/controller/profile-ctrl.js'
                                        
                                    ]);
                                });
                        }]
                    }
        })
        .state('admin.categories',{
            url : '/categories',
            templateUrl :'resources/views/admin/site/category.html',
            controller :'CategoryController',
            resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'uiboostrap',
                                    'toastr',
                                    'paginate',
                                    'select',
                                    // 'resources/assets/admin/js/controller/modalCtrl/upload-avatar-modal-ctrl.js',
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'resources/assets/admin/js/controller/category-ctrl.js'
                                        
                                    ]);
                                });
                        }]
                    }
        })
        .state('admin.news',{
            url : '/news',
            templateUrl :'resources/views/admin/site/news.html',
            controller :'NewsController',
            resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'uiboostrap',
                                    'toastr',
                                    'paginate',
                                    'select',
                                    'cropimage',
                                    'dropzone',
                                    'summernote',
                                    'sanitize',
                                    'resources/assets/admin/js/controller/modalCtrl/news-modal-ctrl.js',
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'resources/assets/admin/js/controller/news-ctrl.js'
                                        
                                    ]);
                                });
                        }]
                    }
        })
        .state('admin.posts',{
            url : '/posts',
            templateUrl :'resources/views/admin/site/post.html',
            controller :'PostCtrl',
            resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'uiboostrap',
                                    'cropimage',
                                    'toastr',
                                    'sanitize',
                                    // 'resources/assets/admin/js/controller/modalCtrl/post-modal-ctrl.js',
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'resources/assets/admin/js/controller/post-ctrl.js'
                                        
                                    ]);
                                });
                        }]
                    }
        })
        .state('admin.playlists',{
            url : '/playlists',
            templateUrl :'resources/views/admin/site/playlists.html',
            controller :'PlaylistCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                            'uiboostrap',
                            'cropimage',
                            'toastr',
                            'sanitize',
                            // 'resources/assets/admin/js/controller/modalCtrl/post-modal-ctrl.js',
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/admin/js/controller/playlist-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('admin.contact',{
            url : '/contacts',
            templateUrl :'resources/views/admin/site/contact.html',
            controller :'ContactCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                            'uiboostrap',
                            'paginate',
                            'toastr',
                            // 'resources/assets/admin/js/controller/modalCtrl/post-modal-ctrl.js',
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/admin/js/controller/contact-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('home', {
            url: '/home',
            template: 'home',
            // templateUrl: 'partial-home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            template: 'about',     
        });
        
}]);