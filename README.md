# README #

Backpackers app is an Web Mobile App developed using Ionic Framework.

### Technologies ###

* Ionic Framework
* Javascript
* AngularJS


### API's ###

##  Google Maps API ##
* Maps screen
* Markers
* Cities Lat and Lng

## YAFRA ##

 * Google Maps integration with ionic side menu. Found [here](http://codepen.io/yafraorg/pen/jBEky)
 

## Backpackers API ##
* API key
* Authentication
* City Search
* Database


### System Requirements ###
* Node.js [Official Site](http://nodejs.org/)
* Cordova  $ sudo npm install -g cordova
* Ionic $ sudo npm install -g ionic


## Screens ##
* appAbout.html 
     - State: app.about
     - Controller: 
* appCItyInfo.html
     - State: app.city
     - Controller: CityCtrl
* appCityInfoReview.html
     - State: app.cityRv
     - Controller: CityCtrlRV
* appCreateReview.html
     - State: app.createReview
     - Controller: CreateReviewCtrl
* appHome.html
     - State: app.home
     - Controller: HomeCtrl
* appIndex.html
     - State: app.index
     - Controller:  SimpleCtrl
* appList.html
    - State: app.list
    - Controller: ListCtrl
* appLogin.html
     - State: app.login
     - Controller: LoginCtrl
* appLogout.html
     - State: app.logout
     - Controller: LogoutCtrl
* appMap.html
     - State: app.map
     - Controller: GpsCtrl
* appMapCalc.html
     - State: app.calc
     - Controller: CalcCtrl
* appMyWishlist.html
     - State: app.myWish
     - Controller: MyWishCtrl
* appProfile.html
     - State: app.profile
     - Controller: ProfileCtrl
* appRegister.html
     - State: app.register
     - Controller: RegisterCtrl
* appReviews.html
     - State: app.reviews
     - Controller: ReviewCtrl
* appSearchCityForReview.html
     - State: app.searchCityForReview
     - Controller: SearchCityForReviewCtrl
* appTripPlan.html
     - State: app.tripPlan
     - Controller: TripPlanCtrl
* appTrips.html
     - State: app.trips
     - Controller: TripCtrl
* appWishlist.html
     - State: app.wishlist
     - Controller: WiLiCtrl
* menu.html
     - State: app
     - Controller: HeaderCtrl


## Controllers ##
* HeaderCtrl: Control the header, buttons and helps to control the user authentication.
     - function: leftButtons : add the menu button to the header.
     - function: addRighButtons : add to the header the button to add a city to your wishlist.
     - function: wishButtons : add to the header the button to show the list of cities in the wishlist.
     - function: reviewButtons : add to the header the button to search to a city for review.
* MainCtrl: Controls the Home page and filling the initial trending list.
     - function: cityInfo :  saves the cityId and redirect to the app.city
* SimpleCtrl: Control the index page to redirect to login page or to register page.
     - function: login : redirect to the app.login
     - function register: redirect to the app.register
* WiLiCtrl: Controls the search for city and build he url to call the web service and redirect to the list page.
     - function: search : verify the fields and seach the city, store the url for the future search and redirect to the app.list
* ListCtrl: Control the list page where are load the list with the cities returned by the service.
     - function: wishCityInfo : saves the cityId and redirect to the app.city
* CityCtrl: Show the city details;
* MyWishCtrl : Show the cities in wishlist.
     - function: cityInfo :  saves the cityId and redirect to the app.city
* CreateReviewCtrl: get the reviewCity build the url to search the city in the web server and add an review to it;
     - function: create : save the review in the webservice
* ReviewCtrl: Show the cities that the user has reviewed
     - function: cityInfo :  saves the reviewCity and redirect to the app.cityRv
* SearchCityForReviewCtrl: Validate the fields to user search the city
     - function: search : validate the field and call the webservice to fill the list of cities
     - function: cityInfo :  saves the reviewCity and redirect to the app.creteReview
* CityCtrlRV: Shows the information fo the citie with the review the user has given
* ProfileCtrl: Show the information of the user.
     - function: save : save the preferences of the user in the web service.
* LoginCtrl: Do the authentication.
     - function: register : redirect to the registration page, app.register
     - function: login : validate fields and if the login is successful redirect to app.home, else show the error message. Save the user api key in local storage to be used as parameter in all the requisitions.
* RegisterCtrl: Register the user
     - function: login : redirect to login page app.login
     - function: register : validate fields and call the webservice to register user
* LogoutCtrl : Do logout. Disconect the user, remove all the variables in local storage.
* CalcCtrl : Search the cities chosen on map by lat and lng, store in a list and do the request.
     - function: getCities : search the id of all the cities chosed by the user and call trip method
     - function: trip : Do the trip request in the webservice

* GpsCtrl : Controls the Map, provided by yafra.org/ in http://codepen.io/yafraorg/pen/jBEky
     - Filters provided by yafra.org/ in http://codepen.io/yafraorg/pen/jBEky
          - lat
          - lon
     - Directives provided by yafra.org/ in http://codepen.io/yafraorg/pen/jBEky
          - appMap
     - function: clearMarks : clear all the marks in the map
     - function: calcTrip : store the cities marked and redirect to app.calc
     - function: undo : undo the last mark
     - function: addMarker : add a new mark in the map on the location user tap
     - function: getMarkTitle: return the title to be added with the mark
     - function: printMarks : only used for debug, print all the marks in the map
* TripCtrl: request for the web service and show the trips requested by user
     - function: tripPlan : store tripId and redirect to app.tripPlan
* TripPlanCtrl : shows the details to the trip plan

