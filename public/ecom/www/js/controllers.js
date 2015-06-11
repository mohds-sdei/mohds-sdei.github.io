angular.module('starter.controllers', [])



.controller('LoginCtrl', function($scope,$state,$cookieStore,login,logout) {
    $scope.data = {};
    $scope.buttonText="Login";
    $scope.msg = '';
    $scope.login = function() {
      $scope.buttonText="Logging in. . .";
      var data = $scope.data;
      var resp = login.save(data,function () {
        //console.log(resp);
        $cookieStore.put('user',resp.data);
        $state.go('admin');
      });
        //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
    
    $scope.logout = function() {
      var data = $scope.data;
      var resp = logout.get(data,function () {
        if (resp.status == true) {
          $cookieStore.remove('user');
          $state.go('login');
        } else {
          alert('Unable to logout.');
        }
        //$cookieStore.put('user',resp.data); 
      });
        //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
    
    
})
.controller('AdminCtrl', function($scope,status,$state,$cookieStore,login,logout) {
        $scope.status = status;
        console.log(status);
        if (status == false) {
            $state.go('login');
        }
        
})
.controller('UserCtrl', function($scope,status,$state,$cookieStore,login,logout,users) {
       
       $scope.users = '';
        console.log(status);
        if (status == false) {
            $state.go('login');
        }
        var userData = users.get(function () {
            console.log(userData);
            $scope.users = userData.data;
        });
        
})
.controller('UserDetailCtrl', function($scope,status,$state,$cookieStore,login,logout,users,$stateParams) {
       
       $scope.user = '';
        //console.log(status);
        if (status == false) {
            $state.go('login');
        }
        
        var userData = users.get({id : $stateParams.id},function () {
           
            $scope.user = userData.data;
        });
        
});