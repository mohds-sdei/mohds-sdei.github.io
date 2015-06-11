

// Declare app level module which depends on filters, and services
angular.module('adminApp', ['ngRoute','ngResource','ngFileUpload','ngCookies','adminControllers','adminServices','productControllers','productServices'])

.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../views/admin/index.html',
        controller: 'DashboardCtrl'
      })
      .when('/manageUsers', {
        templateUrl: '../views/admin/manageUsers.html',
        controller: 'UsersCtrl'
      })
      .when('/manageStories', {
        templateUrl: '../views/admin/manageStories.html',
        controller: 'StoryCtrl'
      })
      .when('/manageCategories', {
        templateUrl: '../views/admin/manageCategories.html',
        controller: 'CategoryCtrl'
      })
      .when('/addCategory', {
        templateUrl: '../views/admin/addCategory.html',
        controller: 'addCategoryCtrl'
      })
      .when('/addSubCategory', {
        templateUrl: '../views/admin/addSubCategory.html',
        controller: 'addSubCategoryCtrl'
      })
      .when('/addProducts', {
        templateUrl: '../views/admin/addProducts.html',
        controller: 'addProductCtrl'
      })
      .when('/addProducts/:id', {
        templateUrl: '../views/admin/addProducts.html',
        controller: 'addProductCtrl'
      })
      .when('/manageProducts', {
        templateUrl: '../views/admin/manageProducts.html',
        controller: 'ProductCtrl'
      })
      .when('/login', {
        templateUrl: '../views/admin/login.html',
        controller: 'LoginCtrl'
      });
    //$locationProvider.html5Mode(true);
  }]);