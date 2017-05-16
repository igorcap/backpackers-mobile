angular.module('state', ['ionic']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "pages/menu.html"
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appHome.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appMap.html',
                    controller: 'GpsCtrl'
                }
            }
        })
        .state('app.reviews', {
            url: '/reviews',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appReviews.html',
                    controller: 'ReviewCtrl'
                }
            }
        }).state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appLogin.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('app.wishlist', {
            url: '/wishlist',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appWishlist.html',
                    controller: 'WiLiCtrl'
                }
            }
        })
        .state('app.myWish', {
            url: '/myWish',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appMyWishlist.html',
                    controller: 'MyWishCtrl'
                }
            }
        })
        .state('app.list', {
            url: '/list',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appList.html',
                    controller: 'ListCtrl'
                }
            }
        })
		.state('app.Reviewlist', {
            url: '/Reviewlist',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appReviewList.html',
                    controller: 'ReviewListCtrl'
                }
            }
        })
        .state('app.trips', {
            url: '/trips',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appTrips.html',
                    controller: 'MainCtrl'
                }
            }
        }).state('app.city', {
            url: '/city',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appCityInfo.html',
                    controller: 'CityCtrl'
                }
            }
        })
        .state('app.cityRv', {
            url: '/cityRv',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appCityInfoReview.html',
                    controller: 'CityCtrlRV'
                }
            }
        })
        .state('app.calc', {
            url: '/calc',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appMapCalc.html',
                    controller: 'CalcCtrl'
                }
            }
        })
        .state('app.register', {
            url: '/register',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appRegister.html',
                    controller: 'RegisterCtrl'
                }
            }
        })
        .state('app.logout', {
            url: '/logout',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appLogout.html',
                    controller: 'LogoutCtrl'
                }
            }
        })
	.state('app.createReview', {
            url: '/createReview',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appCreateReview.html',
                    controller: 'CreateReviewCtrl'
                }
            }
        })
		.state('app.searchCityForReview', {
            url: '/searchCityForReview',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appSearchCityForReview.html',
                    controller: 'SearchCityForReviewCtrl'
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appProfile.html',
                    controller: 'ProfileCtrl'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
}]);
