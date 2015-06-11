angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,stories) {
  $scope.settings = {
    enableFriends: true
  };
   $scope.myname = stories.getName();
  
})
.controller('StoryCtrl', function($scope,stories) {
  
  var storyData = stories.get(function () {
    $scope.stories = storyData.data;
  });
  // $scope.myname = stories.getName();
  
})
.controller('StoryDetailCtrl', function($scope,$stateParams,stories) {
  
  var storyData = stories.get({id : $stateParams.id},function () {
    $scope.story = storyData.data;
  });
  // $scope.myname = stories.getName();
  
})

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
          $state.go('tab.login');
        } else {
          alert('Unable to logout.');
        }
        //$cookieStore.put('user',resp.data); 
      });
        //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
    
    
});
