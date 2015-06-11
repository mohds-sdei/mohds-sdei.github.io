// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngResource','ngCookies','starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
      .state('login',{
            url:'/login',
            controller:'LoginCtrl',
            templateUrl:'templates/login.html'
      })
      .state('admin',{
            url:'/admin',
            //abstract : true,
            controller:'AdminCtrl',
            resolve:{
                status: function (isAuthenticated) {
                  var resp = isAuthenticated.get(function () {
                    if (resp.status == 'false') {
                      return false;
                    } else {
                      return true;
                    }
                  });
                }
            },
            templateUrl:'templates/admin-tabs.html'
      })
      .state('users',{
            url:'/user',
            //abstract : true,
            controller:'UserCtrl',
            resolve:{
                status: function (isAuthenticated) {
                  var resp = isAuthenticated.get(function () {
                    if (resp.status == 'false') {
                      return false;
                    } else {
                      return true;
                    }
                  });
                }
            },
            templateUrl:'templates/users.html'
      })
      .state('user', {
        url: '/user/:id',
        resolve:{
                status: function (isAuthenticated) {
                  var resp = isAuthenticated.get(function () {
                    if (resp.status == 'false') {
                      return false;
                    } else {
                      return true;
                    }
                  });
                }
            },
        views: {
            'tab-user': {
              templateUrl: 'templates/user-details.html',
              controller: 'UserDetailCtrl'
            }
        }
      })
      .state('home', {
          url: '/home',
          views: {
            'home' : {
              templateUrl: 'templates/home.html'
            }
          }
        })
      .state('help', {
          url: '/help',
          views: {
            'help' : {
              templateUrl: 'templates/help.html'
            }
          }
        });  
  
  
  

});