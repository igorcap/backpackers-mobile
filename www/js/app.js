'use strict';
var BkpkApp = angular.module('BkpkApp', ['ionic']);
var myUrl, thisCity, idCity, reviewCity;
var myCities = [];
var cityName;
var markedCities = [];
var citiesCalc = [];
var myReview;
var citiesReviews = [];
var tripPlanId;
/**
 * Routing table including associated controllers.
 */
BkpkApp.run(function ($state) {
	if (window.localStorage['apiKey'] == 'null' || window.localStorage['apiKey'] == null || window.localStorage['apiKey'] == "") {
		$state.go('app.index');
	} else {
		$state.go("app.home");
	}

});
BkpkApp.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
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
			}).state('app.about', {
				url: '/about',
				views: {
					'menuContent': {
						templateUrl: 'pages/appAbout.html',
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
			.state('app.trips', {
				url: '/trips',
				views: {
					'menuContent': {
						templateUrl: 'pages/appTrips.html',
						controller: 'TripCtrl'
					}
				}
			}).state('app.tripPlan', {
				url: '/tripPlan',
				views: {
					'menuContent': {
						templateUrl: 'pages/appTripPlan.html',
						controller: 'TripPlanCtrl'
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
			}).state('app.index', {
				url: "/index",
				views: {
					'menuContent': {
						templateUrl: 'pages/appIndex.html',
						controller: 'SimpleCtrl'
					}
				}
			});


		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/home');
}]);

BkpkApp.controller('HeaderCtrl', function ($scope, $state) {
	if (window.localStorage['apiKey'] == 'null' || window.localStorage['apiKey'] == null || window.localStorage['apiKey'] == "") {
		$state.go('app.index');
	}
	$scope.leftButtons = [{
		type: 'button-clear',
		content: '<i class="icon ion-navicon"></i>',
		tap: function (e) {
			$scope.sideMenuController.toggleLeft();
		}
    }];
	$scope.addRighButtons = [{
		type: 'button-small',
		content: '<i class="icon ion-plus-round"></i>',
		tap: function (e) {
			$scope.sideMenuController.toggleRight();
			var wishlist;
			if (window.localStorage['wishlist'] == null || window.localStorage['wishlist'] == "" || window.localStorage['wishlist'] == "null") {
				wishlist = [];
			} else {
				wishlist = JSON.parse(window.localStorage['wishlist']);
			}

			wishlist.push(thisCity);
			window.localStorage['wishlist'] = JSON.stringify(wishlist);
			alert("City added to your wish list");

		}
    }];

	$scope.wishButtons = [{
		type: 'button-small',
		content: '<i class="icon ion-star"></i>',
		tap: function (e) {
			$scope.sideMenuController.toggleRight();
			$state.go("app.myWish");
		}
    }];

	$scope.reviewButtons = [{
		type: 'button-small',
		content: '<i class="icon ion-plus-round"></i>',
		tap: function (e) {
			$scope.sideMenuController.toggleRight();
			$state.go("app.searchCityForReview");
		}
    }];
});
/**
 * MAIN CONTROLLER - handle inapp browser
 */
BkpkApp.controller('MainCtrl', function ($scope, $http, $state, $window, $log) {

	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/trending?api_key=' + window.localStorage['apiKey'];


	$http.get(url).success(function (data) {
		if (data.status == "ERROR") {
			if (data.message == "API key not found.") {
				$state.go("app.index");
			}
		} else {
			$scope.cities = data.result;
		}
	});


	$scope.cityInfo = function (id) {
		idCity = id;
		$state.go("app.city");
	}

});

BkpkApp.controller('SimpleCtrl', function ($scope, $state) {
	$scope.login = function () {
		$state.go("app.login");
	}

	$scope.register = function () {
		$state.go("app.register");
	}
});



/**
 * Menu item click directive - intercept, hide menu and go to new location
 */
BkpkApp.directive('clickMenulink', function () {
	return {
		link: function ($scope, element, attrs) {
			element.on('click', function (scope) {
				$scope.sideMenuController.toggleLeft();
			});
		}
	}
});
/**
 *	Inicio dos controllers de WishList
 */

BkpkApp.controller("WiLiCtrl", function ($scope, $http, $state) {
	var result;
	$scope.search = function () {
		if ($scope.city == null || $scope.country == null) {
			if ($scope.city == null) {
				document.getElementById("ckeck1").className = "icon ion-close-round";
			}
			if ($scope.country == null) {
				document.getElementById("ckeck2").className = "icon ion-close-round";
			}
		} else {
			document.getElementById("ckeck1").className = "icon ion-checkmark-round";
			document.getElementById("ckeck2").className = "icon ion-checkmark-round";
			var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/search?params[][name]=';
			var cidade = $scope.city;
			var pais = $scope.country;
			myUrl = url + cidade + "&params[][country_name]=" + pais + "&api_key=" + window.localStorage['apiKey'];
			$state.go("app.list");
		}
	}
});

BkpkApp.controller('ListCtrl', function ($scope, $http, $state) {

	$http.get(myUrl).success(function (data) {
		if (data.totalNumberOfItems > 0) {
			if (data.status == "ERROR") {
				if (data.message == "API key not found.") {
					$state.go("app.index");
				}
			}
			$scope.foundCities = data.result;


		} else {
			$scope.error = "No records found";
		}
		document.getElementById("loadingIcon").style.visibility = "hidden";
	});
	$scope.wishCityInfo = function (id) {
		//		console.log("citiinfo");
		idCity = id;
		$state.go("app.city");

	}
});

BkpkApp.controller('CityCtrl', function ($scope, $http) {
	var name;
	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/' + idCity + '?api_key=' + window.localStorage['apiKey'];
	//	console.log(url);
	$http.get(url).success(function (data) {
		if (data.status == "ERROR") {
			if (data.message == "API key not found.") {
				$state.go("app.index");
			}
		} else if (data.status == "OK" || data.status) {
			$scope.city = data.result;
			thisCity = $scope.city;
			$scope.add = "";
		}
		document.getElementById("loadingIcon").style.visibility = "hidden";
	});
});

BkpkApp.controller('MyWishCtrl', function ($scope, $http, $state) {
	var wishlist;
	if (window.localStorage['wishlist'] == null || window.localStorage['wishlist'] == "" || window.localStorage['wishlist'] == "null") {
		wishlist = [];
	} else {
		wishlist = JSON.parse(window.localStorage['wishlist']);
	}

	if (wishlist.length > 0) {
		$scope.wishCities = wishlist;
	} else {
		$scope.error = "No records found";
	}

	$scope.cityInfo = function (id) {
		//		console.log("citiinfo");
		idCity = id;
		$state.go("app.city");
	}

});

/**
 *	Fim dos controllers de WishList
 */


/**
 *	Inicio dos controllers de Review
 */
BkpkApp.controller('ReviewListCtrl', function ($scope, $http, $state) {
	$http.get(myUrl).success(function (data) {
		if (data.status == "ERROR") {
			if (data.message == "API key not found.") {
				$state.go("app.index");
			}
		} else if (data.status == "OK") {
			if (data.totalNumberOfItems > 0) {
				$scope.reviewCities = data.result;
			} else {
				$scope.error = "No records found";
			}
		}
	});
	$scope.cityInfo = function (id) {
		//		console.log("citiinfo");
		idCity = id;
		$state.go("app.cityRv");
	}
});

BkpkApp.controller('CreateReviewCtrl', function ($scope, $http, $state, $log) {
	$scope.review = 0;
	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/' + reviewCity + '?api_key=' + window.localStorage['apiKey'];
	$http.get(url).success(function (data) {
		if (data.status == "ERROR") {
			if (data.message == "API key not found.") {
				$state.go("app.login");
			}
		} else if (data.status == "OK" || data.status) {
			$scope.city = data.result;
			document.getElementById("loadingIcon").style.visibility = "hidden";
		}
	});
	$scope.create = function () {
		var url = "http://backpackers-vsnetwork.rhcloud.com/api/v1/review?api_key=" + window.localStorage['apiKey'];
		var params = {
			"params": {
				"id_city": $scope.city.id_city,
				"stars": this.review
			}
		};
		$http.post(url, params).
		success(function (data) {
			if (data.status == "ERROR") {
				if (data.message == "API key not found.") {
					$state.go("app.index");
				}
			} else if (data.status == "OK") {
				alert("Review saved");
				$state.go("app.reviews");
			}

		});
	}
});

BkpkApp.controller('ReviewCtrl', function ($scope, $http, $state) {
	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/reviews?api_key=' + window.localStorage['apiKey'];
	$http.get(url).success(function (data) {
		document.getElementById("loadingIcon").style.visibility = "hidden";
		if (data.status == "ERROR") {
			if (data.message == "API key not found.") {
				$state.go("app.index");
			} else if (data.message == "The user has not reviewed this city") {
				$scope.label = "The user has not reviewed this city.";
			}
		} else if (data.status == "OK") {
			$scope.citiesReviews = data.result;
			citiesReviews = data.result;
		}
	});


	$scope.cityInfo = function (id) {
		idCity = id;
		$state.go("app.cityRv");
	}

});


BkpkApp.controller('SearchCityForReviewCtrl', function ($scope, $http, $state, $log) {
	//	$log.debug("SearchCityForReviewCtrl");
	$scope.search = function () {
		$scope.error = "";
		if ($scope.city == null || $scope.country == null) {
			if ($scope.city == null) {
				document.getElementById("ckeck1").className = "icon ion-close-round";
			}
			if ($scope.country == null) {
				document.getElementById("ckeck2").className = "icon ion-close-round";
			}
		} else {
			document.getElementById("loadingIcon").style.visibility = "visible";
			document.getElementById("ckeck1").className = "icon ion-checkmark-round";
			document.getElementById("ckeck2").className = "icon ion-checkmark-round";
			var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/search?params[][name]=';
			var cidade = $scope.city;
			var pais = $scope.country;

			var thisUrl;
			thisUrl = url + cidade + "&params[][country_name]=" + pais + "&api_key=" + window.localStorage['apiKey'];

			//			$log.debug(thisUrl);
			$http.get(thisUrl).success(function (data) {
				if (data.status == "ERROR" || !data.status) {
					if (data.message == "API key not found.") {
						$state.go("app.index");
					}
				} else if (data.status == "OK" || data.status) {
					//					$log.info("OK");
					$scope.searchCities = data.result;
					document.getElementById("loadingIcon").style.visibility = "hidden";
					if (data.result.length < 1) {
						$scope.error = "No records found";
					} else {
						$scope.error = "";
					}
					//					console.log($scope.searchCities);
				}

			});

			$scope.cityInfo = function (id) {
				reviewCity = id;
				$state.go("app.createReview");
			}

		}

	}
});


BkpkApp.controller('CityCtrlRV', function ($scope, $http) {

	var end;
	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/' + idCity + '?api_key=' + window.localStorage['apiKey'];


	$http.get(url).success(function (data) {
		if (data.status == "ERROR") {
			if (data.message == "API key not found." || !data.status) {
				$state.go("app.index");
			}
		} else if (data.status == "OK" || data.status) {
			$scope.city = data.result;
			thisCity = $scope.city;
			$scope.add = "";
		}
		document.getElementById("loadingIcon").style.visibility = "hidden";
	});

	for (var x = 0; x < citiesReviews.length; x++) {
		if (citiesReviews[x].id_city == idCity) {
			end = citiesReviews[x].stars;
		}
	}
	var star = "<i class='icon ion-star'></i> ";
	var final = "My Review: ";
	for (var i = 0; i < end; i++) {
		final += star;
	}
	$scope.rev = final;


});

/**
 *	Fim dos controllers de Review
 */


/**
 *	Inicio dos controllers de Login Logout Registro e Profile
 */

BkpkApp.controller('ProfileCtrl', function ($scope, $http, $log) {
	$scope.key = window.localStorage['apiKey'];
	$scope.user = window.localStorage['user'];
	//	$log.debug(window.localStorage['sport'], window.localStorage['adventure'], window.localStorage['art_and_culture'], window.localStorage['entertainment'], window.localStorage['landscape'], window.localStorage['urban']);

	if (window.localStorage['sport'] == null || window.localStorage['adventure'] == null || window.localStorage['art_and_culture'] == null || window.localStorage['entertainment'] == null || window.localStorage['landscape'] == null || window.localStorage['urban'] == null) {
		$scope.sport = 0;
		$scope.adventure = 0;
		$scope.art_and_culture = 0;
		$scope.entertainment = 0;
		$scope.landscape = 0;
		$scope.urban = 0;
		$scope.label = "Preferences not registred"
	} else {
		if (window.localStorage['sport'] == "null")
			$scope.sport = window.localStorage['sport'];
		$scope.adventure = window.localStorage['adventure'];
		$scope.art_and_culture = window.localStorage['art_and_culture'];
		$scope.entertainment = window.localStorage['entertainment'];
		$scope.landscape = window.localStorage['landscape'];
		$scope.urban = window.localStorage['urban'];
	}
	//	console.log($scope.key);
	//		window.localStorage['apiKey'];
	$scope.save = function () {
		var params = {
			"params": {
				"sport": $scope.sport,
				"adventure": $scope.adventure,
				"art_and_culture": $scope.art_and_culture,
				"entertainment": $scope.entertainment,
				"landscape": $scope.landscape,
				"urban": $scope.urban
			}
		}

		$http.post('http://backpackers-vsnetwork.rhcloud.com/api/v1/preference?api_key=' + window.localStorage['apiKey'], params).
		success(function (data) {
			$log.debug(data);
			if (data.status == "ERROR") {
				if (data.message == "API key not found.") {
					$state.go("app.index");
				}
			} else if (data.status == "OK") {
				alert("Preferences saved");
				$scope.label = "";
				window.localStorage['sport'] = $scope.sport;
				window.localStorage['adventure'] = $scope.adventure;
				window.localStorage['art_and_culture'] = $scope.art_and_culture;
				window.localStorage['entertainment'] = $scope.entertainment;
				window.localStorage['landscape'] = $scope.landscape;
				window.localStorage['urban'] = $scope.urban;
			}

		});
	}

});
BkpkApp.controller('LoginCtrl', function ($scope, $http, $state, $interval) {

	$scope.register = function () {
		$state.go("app.register");
	}
	$scope.login = function () {
		$scope.label = "";
		if ($scope.user == null || $scope.pass == null) {
			if ($scope.user == null) {
				document.getElementById("ckeck1").className = "icon ion-close-round";
			}



			if ($scope.pass == null) {
				document.getElementById("ckeck2").className = "icon ion-close-round";
			}
		} else {
			document.getElementById("loadingIcon").style.visibility = "visible";
			document.getElementById("ckeck1").className = "icon ion-checkmark-round";
			document.getElementById("ckeck2").className = "icon ion-checkmark-round";
			//			console.log($scope.user + " - " + $scope.pass);
			$http.post('http://backpackers-vsnetwork.rhcloud.com/api/v1/user/authenticate', {
				"params": {
					"username": $scope.user,
					"password": $scope.pass
				}
			}).
			success(function (data) {
				//				console.log(data);
				if (data.status == "ERROR") {
					document.getElementById("loadingIcon").style.visibility = "hidden";
					if (data.message == "API key not found.") {
						$state.go("app.index");
					} else if (data.message == "Authentication error: Bad credentials.") {
						$scope.label = "Username or Password incorrect";
						$scope.user = "";
						$scope.pass = "";
					}
				} else if (data.status == "OK") {
					window.localStorage['apiKey'] = data.result.api_key;
					window.localStorage['user'] = data.result.name;
					document.getElementById("loadingIcon").style.visibility = "visible";
					$scope.label = "Wait while you are being redirected";
					$interval(function () {
						$state.go("app.home");
					}, 5000, 1, false);


				}

			});
		}
	}

});


BkpkApp.controller('RegisterCtrl', function ($scope, $http, $interval, $state) {
	$scope.login = function () {
		$state.go("app.login");
	}
	$scope.register = function () {
		//		console.log("Email " + $scope.email);
		//		console.log("Username " + $scope.user);
		//		console.log("Password " + $scope.pass);
		//
		//		console.log("Calling server..");
		$http.post('http://backpackers-vsnetwork.rhcloud.com/api/v1/user', {
			"params": {
				"name": $scope.user,
				"username": $scope.user,
				"password": $scope.pass,
				"email": $scope.email
			}
		}).
		success(function (data) {
			if (data.status == "ERROR") {
				if (data.message == "API key not found.") {
					$state.go("app.index");
				} else {
					if (data.message == "Duplicate entry") {
						$scope.label = "Username already in use.";
					} else {
						$scope.label = "Sorry something wrong happened, try again.";
					}
				}
			} else if (data.status == "OK") {
				console.log(data);
				console.log(data.result);
				window.localStorage['apiKey'] = data.result.api_key;
				$scope.label = "User registered. Wait Redirection"
				document.getElementById("loadingIcon").style.visibility = "visible";
				$scope.register = $interval(function () {
					$state.go("app.login");
				}, 3000, 2, false);

			}
			console.log("Close server..");
		});


	}


});

BkpkApp.controller('LogoutCtrl', function ($scope, $interval, $state) {
	$scope.logout = $interval(function () {
		console.log("logout");
		window.localStorage.removeItem('apiKey');
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('sport');
		window.localStorage.removeItem('adventure');
		window.localStorage.removeItem('art_and_culture');
		window.localStorage.removeItem('entertainment');
		window.localStorage.removeItem('landscape');
		window.localStorage.removeItem('urban');
		window.localStorage.removeItem('wishlist');
		$state.go("app.index");
	}, 5000, 1, false);


});
/**
 *	Fim dos controllers de Login Logout Registro e Profile
 */


/**
 *	Inicio dos controllers de Mapa e Trip Request
 */

BkpkApp.controller('CalcCtrl', function ($scope, $http, $log, $window, $q) {
	$scope.label = "Generating Trip";
	var cidades = getCities();

	function getCities() {
		var calcCidades = [];
		var idsArray = [];
		var i = 0;

		for (i = 0; i < markedCities.length; i++) {
			var url = "http://backpackers-vsnetwork.rhcloud.com/api/v1/city/closest?api_key=" + window.localStorage['apiKey'] + "&params[latitude]=" + markedCities[i].position.lat() + "&params[longitude]=" + markedCities[i].position.lng() + "&sensor=true";
			$http.get(url).success(function (data) {
				if (data.status == "ERROR") {
					if (data.message == "API key not found.") {
						$state.go("app.login");
					}
				} else if (data.status == "OK" || data.status) {
					calcCidades.push(data.result[0]);
					idsArray.push(data.result[0].id_city);
					if (markedCities.length == calcCidades.length) {
						trip(idsArray);
					}
				}
			});
		}
		$scope.markedCities = calcCidades;
		return calcCidades;
	}

	function trip(citiesId) {
		var destinationCities = [];
		for (var i = 1; i < citiesId.length; i++) {
			destinationCities.push(citiesId[i]);
		}
		var params = {
			"params": {
				"originCityId": citiesId[0],
				"citiesIds": destinationCities
			}
		};
		var url = "http://backpackers-vsnetwork.rhcloud.com/api/v1/trip/request?api_key=" + window.localStorage['apiKey'];
		//		$log.debug(params);
		//		$log.debug(url);
		$http.post(url, params).
		success(function (data) {
			if (data.status == "ERROR") {
				if (data.message == "API key not found.") {
					$state.go("app.index");
				}
			} else if (data.status == "OK") {
				//				$log.debug(data);
				document.getElementById("successMessage").style.visibility = "visible";
				$scope.message = "Trip request successful";
				$scope.trip = data.result;
				document.getElementById("loadingIcon").style.visibility = "hidden";
				$scope.label = "";
			}
		});
	}
});



/**
 * A google map / GPS controller.
 */
BkpkApp.controller('GpsCtrl', ['$scope', '$ionicPlatform', '$location',
    function ($scope, $ionicPlatform, $location) {


		markedCities = [];
		// init gps array
		$scope.whoiswhere = [];
		$scope.basel = {
			lat: 53.349757186458866,
			lon: -6.259932518005371
		};


		// check login code
		$ionicPlatform.ready(function () {

			navigator.geolocation.getCurrentPosition(function (position) {
				$scope.position = position;
				var c = position.coords;
				$scope.gotoLocation(c.latitude, c.longitude);
				$scope.$apply();
			}, function (e) {
				console.log("Error retrieving position " + e.code + " " + e.message)
			});
			$scope.gotoLocation = function (lat, lon) {
				if ($scope.lat != lat || $scope.lon != lon) {
					$scope.basel = {
						lat: lat,
						lon: lon
					};
					if (!$scope.$$phase) $scope.$apply("basel");
				}


			};

			// some points of interest to show on the map
			// to be user as markers, objects should have "lat", "lon", and "name" properties
			$scope.whoiswhere = [{
				"name": "My Marker",
				"lat": $scope.basel.lat,
				"lon": $scope.basel.lon
            }, ];

		});


    }
]);

// formats a number as a latitude (e.g. 40.46... => "40°27'44"N")
BkpkApp.filter('lat', function () {
	return function (input, decimals) {
		if (!decimals) decimals = 0;
		input = input * 1;
		var ns = input > 0 ? "N" : "S";
		input = Math.abs(input);
		var deg = Math.floor(input);
		var min = Math.floor((input - deg) * 60);
		var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
		return deg + "°" + min + "'" + sec + '"' + ns;
	}
});

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
BkpkApp.filter('lon', function () {
	return function (input, decimals) {
		if (!decimals) decimals = 0;
		input = input * 1;
		var ew = input > 0 ? "E" : "W";
		input = Math.abs(input);
		var deg = Math.floor(input);
		var min = Math.floor((input - deg) * 60);
		var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
		return deg + "°" + min + "'" + sec + '"' + ew;
	}
});

/**
 * Handle Google Maps API V3+
 */
// - Documentation: https://developers.google.com/maps/documentation/
BkpkApp.directive("appMap", function ($window, $http, $state, $q, $log) {
	// console.log("appMap");

	var markersList = [];
	var citiesList = [];
	$window.clearMarks = function () {
		//		$log.debug("clearMarks");
		setAllMap(null);
	}
	$window.calcTrip = function () {
		markedCities = markersList;
		$state.go("app.calc");
	}

	$window.undo = function () {
		//		$log.debug("undo");
		markersList[markersList.length - 1].setMap(null);
		markersList = markersList.slice(0, markersList.length - 1);
	}

	function setAllMap(map) {
		for (var i = 0; i < markersList.length; i++) {
			markersList[i].setMap(map);
		}
		markersList = [];
	}
	return {
		restrict: "E",
		replace: true,
		template: "<div></div>",
		scope: {
			center: "=", // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
			markers: "=", // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
			width: "@", // Map width in pixels.
			height: "@", // Map height in pixels.
			zoom: "@", // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
			mapTypeId: "@", // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
			panControl: "@", // Whether to show a pan control on the map.
			zoomControl: "@", // Whether to show a zoom control on the map.
			scaleControl: "@" // Whether to show scale control on the map.
		},
		link: function (scope, element, attrs) {
			var toResize, toCenter;
			var map;
			var infowindow;
			var currentMarkers;
			var callbackName = 'InitMapCb';

			// callback when google maps is loaded
			$window[callbackName] = function () {
				// console.log("map: init callback");
				createMap();
				updateMarkers();
			};

			if (!$window.google || !$window.google.maps) {
				//console.log("map: not available - load now gmap js");
				loadGMaps();
			} else {
				//   console.log("map: IS available - create only map now");
				createMap();
			}

			function loadGMaps() {
				//    console.log("map: start loading js gmaps");
				var script = $window.document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb';
				$window.document.body.appendChild(script);
			}

			function createMap() {
				//  console.log("map: create map start");
				var mapOptions = {
					zoom: 10,
					center: new google.maps.LatLng(53.34, -6.25),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					panControl: true,
					zoomControl: true,
					mapTypeControl: true,
					scaleControl: false,
					streetViewControl: false,
					navigationControl: true,
					disableDefaultUI: true,
					overviewMapControl: true
				};
				if (!(map instanceof google.maps.Map)) {
					// console.log("map: create map now as not already available ");
					map = new google.maps.Map(element[0], mapOptions);
					// EDIT Added this and it works on android now
					// Stop the side bar from dragging when mousedown/tapdown on the map
					google.maps.event.addDomListener(element[0], 'mousedown', function (e) {
						e.preventDefault();
						return false;
					});
					infowindow = new google.maps.InfoWindow();
				}
			}

			//        scope.$watch('markers', function() {
			//          updateMarkers();
			//          });

			// Info window trigger function
			function onItemClick(pin) {
				// Create content
				var contentString = "Name: " + pin.title;
				// Replace our Info Window's content and position
				infowindow.setContent(contentString);
				infowindow.setPosition(pin.position);
				infowindow.open(map)
				google.maps.event.addListener(infowindow, 'closeclick', function () {
					//   console.log("map: info windows close listener triggered ");
					infowindow.close();
				});
			}
			google.maps.event.addListener(map, 'click', function (event) {
				//  console.log("Adding mark on lat " + event.latLng.lat() + " lng " + event.latLng.lng());
				addMarker(event.latLng);
				//  				 getName(event.latLng.lat(), event.latLng.lng());
			});




			function markerCb(marker, member, location) {
				// console.log("markerCb");
				return function () {
					//   console.log("map: marker listener for " + member.name);
					var href = "http://maps.apple.com/?q=" + member.lat + "," + member.lon;
					map.setCenter(location);
					onItemClick(marker, member.name, member.date, href);
				};
			}

			function addMarker(location) {
				citiesList.push(location);
				var title;
				var promise = getMarkTitle(location);
				promise.then(
					function (payload) {
						title = payload.city + " - " + payload.iso;
						//						$log.debug(payload.city + " - " + payload.iso);
						var marker = new google.maps.Marker({
							position: location,
							map: map,
							title: title
						});
						markersList.push(marker);
						onItemClick(marker);
						//						printMarks();
					},
					function (errorPayload) {
						//						$log.error('failure loading movie', errorPayload);
					});

			}

			function getMarkTitle(position) {
				var deferred = $q.defer();
				var title;
				var url = "http://backpackers-vsnetwork.rhcloud.com/api/v1/city/closest?api_key=" + window.localStorage['apiKey'] + "&params[latitude]=" + position.lat() + "&params[longitude]=" + position.lng() + "&sensor=true";
				var cidade;
				$http.get(url).success(function (data) {
					if (data.status == "ERROR") {
						if (data.message == "API key not found.") {
							$state.go("app.login");
						}
					} else if (data.status == "OK" || data.status) {
						deferred.resolve({
							city: data.result[0].name,
							iso: data.result[0].country_iso_2
						});
					}
				});
				return deferred.promise;
			}

			function printMarks() {

				for (var i = 0; i < markersList.length; i++) {
					var m = markersList[i];
					var loc = new google.maps.LatLng(m.lat, m.lon);
					var mm = new google.maps.Marker({
						position: loc,
						map: map,
						title: m.title
					});
					console.log("Print mark on lat " + markersList[i].position.lat() + " lng " + markersList[i].position.lng() + " - " + mm.title);
				}
			}

			// convert current location to Google maps location
			function getLocation(loc) {
				if (loc == null) return new google.maps.LatLng(40, -73);
				if (angular.isString(loc)) loc = scope.$eval(loc);
				return new google.maps.LatLng(loc.lat, loc.lon);
			}

		} // end of link:
	}; // end of return
});

BkpkApp.controller('TripCtrl', function ($scope, $http, $state, $log) {
	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/trip/request?api_key=' + window.localStorage['apiKey'];
	//	console.log(url);
	$http.get(url).success(function (data) {
		//		console.log(data);
		if (data.status == "ERROR") {
			if (data.message == "API key not found.") {
				$state.go("app.login");
			} else if (data.message == "There is no trip request for this user.") {
				$scope.label = "There is no trip request for this user.";
			}
		} else if (data.status == "OK") {
			$log.debug(data);
			$scope.requests = data.result;
		}
		document.getElementById("loadingIcon").style.visibility = "hidden";
	});

	$scope.tripPlan = function (tripId) {
		$log.debug(tripId);
		if (tripId != null) {
			tripPlanId = tripId;
			$state.go("app.tripPlan");
		}
	}
});

BkpkApp.controller('TripPlanCtrl', function ($scope, $http, $state, $log) {
	var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/trip/plan?api_key=' + window.localStorage['apiKey'] + "&params[id_trip_plan]=" + tripPlanId;
	//	$log.debug(url);
	$http.get(url).success(function (data) {
				$log.debug(data);
		if (data.status == "OK") {
			$scope.plan = data.result;
			$scope.itinerary = data.result.itinerary;
			//			$log.debug(data.result);
			document.getElementById("loadingIcon").style.visibility = "hidden";
			document.getElementById("card").style.visibility = "visible";
			document.getElementById("myList").style.visibility = "visible";

		}
	});
});

/**
 *	Fim dos controllers de Mapa
 */
