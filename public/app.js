// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute','ngCookies','ngFileUpload','controllers','services'])

.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/index.html',
        controller: 'IndexCtrl'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/search', {
        templateUrl: 'views/index.html',
        //controller: 'UploadCtrl'
      });
    //$locationProvider.html5Mode(true);
  }]);