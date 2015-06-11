angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,login,$cookieStore,$state,logout,$rootScope) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var UserCookie = $cookieStore.get('user');
  if (UserCookie) {
    console.log('Cookie : ' + UserCookie);
    $scope.auth = UserCookie;
    $rootScope.loggedIn = true;
    $rootScope.loggedOut = false;
  } else {
    $rootScope.loggedIn = false;
    $rootScope.loggedOut = true;
  }
  
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
    var data = $scope.loginData;
     var resp = login.save(data,function () {
        //console.log(resp);
        $rootScope.loggedIn = true;
        $rootScope.loggedOut = false;
        if (resp.data) {
          $scope.auth = resp.data;
          $scope.closeLogin();
        }
        $cookieStore.put('user',resp.data);
        $state.go('app.products');
      });
  };
  
  $scope.logout = function() {
    var resp = logout.get(function () {
        if (resp.status == true) {
          $rootScope.loggedIn = false;
          $rootScope.loggedOut = true;
          $cookieStore.remove('user');
          $state.go('app.products');
        } else {
          alert('Unable to logout.');
        }
        //$cookieStore.put('user',resp.data); 
      });
  };
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('UsersCtrl', function($scope, $stateParams,$state,$cookieStore,users) {
   $scope.users = '';
   var userData = users.get(function () {
       
        $scope.users = userData.data;
   });
   
   $scope.doRefresh = function() {
    var userData = users.get(function () {
      $scope.users = userData.data;
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };
   
   
  
  
})
.controller('UserCtrl', function($scope, $stateParams,$state,$cookieStore,users) {
    $scope.user = '';
    var userData = users.get({id : $stateParams.id},function () {
        $scope.user = userData.data;
    });
  
  
})
.controller('ProductsCtrl', function($scope, $stateParams,$state,$cookieStore,products,DataService) {
   //$scope.products = '';
   $scope.cart = DataService.cart;
   
   var productsData = products.get(function () {
        $scope.products = productsData.data;
   });
   
   
  $scope.doRefresh = function() {
    var productsData = products.get(function () {
        $scope.products = productsData.data;
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };
  
  
})
.controller('ProductCtrl', function($scope, $stateParams,$state,$cookieStore,products,DataService) {
    $scope.product = '';
    $scope.cart = DataService.cart;
    var productData = products.get({id : $stateParams.id},function () {
        $scope.product = productData.data;
    });
  
  
})
.controller('CartsCtrl', function($scope, $stateParams,$state,$cookieStore,products,DataService) {
    $scope.cart = DataService.cart;
  
});
