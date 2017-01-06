angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
    var bgOptions = {
      stationaryRadius: 25,
      distanceFilter: 10,
      desiredAccuracy: 0,
      debug: false,
      //notificationTitle: 'Background tracking',
      //notificationText: 'enabled',
      //notificationIconColor: '#FEDD1E',
      //notificationIconLarge: 'mappointer_large',
      //notificationIconSmall: 'mappointer_small',
      locationProvider: 0,//backgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnTerminate: false,
      //startOnBoot: false,
      //startForeground: true,
      //stopOnStillActivity: true,
      activityType: 'AutomotiveNavigation',//iOS
      //url: 'http://192.168.81.15:3000/locations',
      //syncUrl: 'http://192.168.81.15:3000/sync',
      //syncThreshold: 100,
      /*httpHeaders: {
        'X-FOO': 'bar'
      },*/
      pauseLocationUpdates: false,//iOS
      saveBatteryOnBackground: false,//iOS
      //maxLocations: 100
    }; 
    function setCurrentLocation (location) {
      var latlng = new google.maps.LatLng(Number(location.latitude), Number(location.longitude));
      locationMarkers.push(new google.maps.Marker({
          icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: 'green',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 3
          },
          map: map,
          position: latlng
      }));
      backgroundGeoLocation.finish();
    }  
    function failureFn (error) {
      $ionicPopup.alert({
        template: 'BackgroundGeoLocation error ' + JSON.stringify(error)
           });
    }
    backgroundGeoLocation.configure(setCurrentLocation, failureFn, bgOptions/*{
      desiredAccuracy: 10,//10,
      stationaryRadius: 50,//20,
      distanceFilter: 50,//20,
      locationProvider: 0,
      debug: false,
      stopOnTerminate: true
    }*/);
    $scope.data = {start:0};
    var myLatlng = new google.maps.LatLng('-12.111597', '-76.999869');
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),mapOptions);
    var locationMarkers = [];
    $scope.map = map;
    $scope.start = function() {
      backgroundGeoLocation.start();     
      $scope.data.start = 1;
    };
    $scope.stop = function() {     
      backgroundGeolocation.stop();
      $scope.data.start = 0;
    };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
