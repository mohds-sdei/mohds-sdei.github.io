// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngResource','ngCookies', 'starter.controllers','starter.services'])

.run(function($ionicPlatform,$rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Loading...'})
  });

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  });
  
})

.config(function($httpProvider,$stateProvider, $urlRouterProvider) {
  
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  });
  
  
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.users', {
    url: "/users",
    views: {
      'menuContent': {
        templateUrl: "templates/users.html",
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.usersingle', {
    url: "/users/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/user.html",
        controller: 'UserCtrl'
      }
    }
  })
  .state('app.products', {
    url: "/products",
    views: {
      'menuContent': {
        templateUrl: "templates/products.html",
        controller: 'ProductsCtrl'
      }
    }
  })
  .state('app.productsingle', {
    url: "/products/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/product.html",
        controller: 'ProductCtrl'
      }
    }
  })
  
  .state('app.cart', {
      url: "/cart",
      views: {
        'menuContent': {
          templateUrl: "templates/cart.html",
          controller: 'CartsCtrl'
        }
      }
    })
  
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/products');
});
