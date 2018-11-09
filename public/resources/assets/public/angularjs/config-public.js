var app = angular.module('app');

app.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','FacebookProvider',function($stateProvider, $urlRouterProvider,$ocLazyLoadProvider,FacebookProvider) {
    FacebookProvider.init('622404337952796');
    // $urlRouterProvider.otherwise('/home');
    $urlRouterProvider
    // .when("/home", "/about")
    .otherwise('/home');
    
    $stateProvider
        .state('/home', {
            url: '/home',
            templateUrl: 'resources/views/public/blocks/home.html',
            controller :'HomeCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/home-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('life', {
            url: '/life-style',
            templateUrl: 'resources/views/public/site/life.html',
            controller :'LifeStyleCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/lifestyle-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('trip', {
            url: '/my-trip',
            templateUrl: 'resources/views/public/site/trip.html',
            controller :'TripController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/trip-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('video', {
            url: '/video',
            templateUrl: 'resources/views/public/site/video.html',
            controller :'VideoController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/video-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('audio', {
            url: '/relax',
            templateUrl: 'resources/views/public/site/audio.html',
            controller :'AudioController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/audio-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('playlists', {
            url: '/playlists',
            templateUrl: 'resources/views/public/site/playlist.html',
            controller :'PlaylistController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/playlist-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('history', {
            url: '/yeah-i-write',
            templateUrl: 'resources/views/public/site/history.html',
            controller :'HistoryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/history-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('historycollected', {
            url: '/history-in-my-eye',
            templateUrl: 'resources/views/public/site/history-collected.html',
            controller :'HistoryCollectedCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/history-collected-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('images', {
            url: '/images',
            templateUrl: 'resources/views/public/site/images.html',
            controller :'ImagesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/images-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('site', {
            url: '/site/:Name-:Id-category',
            templateUrl: 'resources/views/public/site/site-category.html',
            controller :'SiteCategory',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                            'uiboostrap'
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/site-category-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        .state('detail', {
            url: '/:Name-:Id.angularjs',
            templateUrl: 'resources/views/public/site/detail.html',
            controller :'DetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                            'uiboostrap'
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                        .then(function() {
                            return $ocLazyLoad.load([
                                'resources/assets/public/angularjs/controller/detail-ctrl.js'
                                
                            ]);
                        });
                }]
            }
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     template: 'about',     
        // });
        // HOME STATES AND NESTED VIEWS ========================================
        // .state('admin',{
        //     url : '/admin',
        //     templateUrl: 'resources/views/admin/blocks/admin.html'

        // })
        // .state('login',{
        //     url : '/login',
        //     templateUrl: 'resources/views/admin/site/login.html',
        //     controller :'LoginCtrl',
        //     resolve: {
        //                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                             // 'resources/assets/admin/js/controller/dashboard-ctrl.js'
        //                         ], {
        //                             insertBefore: '#lazyload_placeholder'
        //                         })
        //                         .then(function() {
        //                             return $ocLazyLoad.load([
        //                                 'resources/assets/admin/js/controller/login-ctrl.js'
        //                             ]);
        //                         });
        //                 }]
        //             }
        // })
        // .state('admin.dashboard',{
        //     url : '/dashboard',
        //     templateUrl :'resources/views/admin/site/dashboard.html',
        //     controller :'DashboardCtrl',
        //     resolve: {
        //                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                             'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
        //                         ], {
        //                             insertBefore: '#lazyload_placeholder'
        //                         })
        //                         .then(function() {
        //                             return $ocLazyLoad.load([
        //                                 'resources/assets/admin/js/controller/dashboard-ctrl.js'
                                        
        //                             ]);
        //                         });
        //                 }]
        //             }
        // })
        // .state('admin.profile',{
        //     url : '/profile',
        //     templateUrl :'resources/views/admin/site/profile.html',
        //     controller :'ProfileController',
        //     resolve: {
        //                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                             'uiboostrap',
        //                             'cropimage',
        //                             'toastr',
        //                             'resources/assets/admin/js/controller/modalCtrl/upload-avatar-modal-ctrl.js',
        //                         ], {
        //                             insertBefore: '#lazyload_placeholder'
        //                         })
        //                         .then(function() {
        //                             return $ocLazyLoad.load([
        //                                 'resources/assets/admin/js/controller/profile-ctrl.js'
                                        
        //                             ]);
        //                         });
        //                 }]
        //             }
        // })
        // .state('admin.categories',{
        //     url : '/categories',
        //     templateUrl :'resources/views/admin/site/category.html',
        //     controller :'CategoryController',
        //     resolve: {
        //                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                             'uiboostrap',
        //                             'toastr',
        //                             'paginate',
        //                             'treeview',
        //                             // 'resources/assets/admin/js/controller/modalCtrl/upload-avatar-modal-ctrl.js',
        //                         ], {
        //                             insertBefore: '#lazyload_placeholder'
        //                         })
        //                         .then(function() {
        //                             return $ocLazyLoad.load([
        //                                 'resources/assets/admin/js/controller/category-ctrl.js'
                                        
        //                             ]);
        //                         });
        //                 }]
        //             }
        // })
        // .state('admin.news',{
        //     url : '/news',
        //     templateUrl :'resources/views/admin/site/news.html',
        //     controller :'NewsController',
        //     resolve: {
        //                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                             'uiboostrap',
        //                             'toastr',
        //                             'paginate',
        //                             'treeview',
        //                             'select',
        //                             'cropimage',
        //                             'dropzone',
        //                             'resources/assets/admin/js/controller/modalCtrl/news-modal-ctrl.js',
        //                         ], {
        //                             insertBefore: '#lazyload_placeholder'
        //                         })
        //                         .then(function() {
        //                             return $ocLazyLoad.load([
        //                                 'resources/assets/admin/js/controller/news-ctrl.js'
                                        
        //                             ]);
        //                         });
        //                 }]
        //             }
        // })
        // .state('home', {
        //     url: '/home',
        //     template: 'home',
        //     // templateUrl: 'partial-home.html'
        // })
        
        // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     template: 'about',     
        // });
        
}]);