angular.module('adminControllers',[])

.controller('LoginCtrl', ['$scope','$rootScope','$http','$location','loginService', function($scope,$rootScope,$http,$location,loginService) {
   
   $scope.errmsg = '';
   $scope.loginSubmit = function(data) {
    
    $scope.loginData = new loginService();
    $scope.loginData.username = data.username;
    $scope.loginData.password = data.password;
    
    var entry = loginService.save($scope.loginData,function(err) {
         //console.log(err);
         if (entry == 'Unauthorized') {
            $scope.errmsg = 'Invalid username or password.';
         }
         if (entry.status == true) {
            $scope.errmsg = 'Successfully logged in. Redirecting..........';
            $location.path('/');
         } else {
            $scope.errmsg = 'Invalid username or password.';
         }
    }); 
   }
   
    
   
    
    
    
}])


.controller('DashboardCtrl', ['$scope','$rootScope','$http','dashboardService', function($scope,$rootScope,$http,dashboardService) {
   
   
    $rootScope.name = "shais";
   
    var users = dashboardService.getUserCount().get(function() {
         $rootScope.users  = users.data;
    });
    var stories = dashboardService.getStoryCount().get(function() {
         $rootScope.stories  = stories.data;
    });
    
    
}])


.controller('UsersCtrl', ['$scope','$rootScope','$location','$http','userService', function($scope,$rootScope,$location,$http,userService) {
    $scope.data = '';
    $scope.edit = true;
    var entry = userService.get(function() {
         $scope.data = entry.data;
    });
    
    $scope.disable = true;
    if ($scope.name != '') {
        $scope.disable = false;
    }
    
    $scope.editUser = function(id) {
        
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.name = '';
            $scope.uname = '';
            $scope.age = '';
            $scope.qualification = '';
            $scope.password = '';
        } else {
            $scope.edit = false;
            $scope.incomplete = false;
            var entry = userService.get({id : id},function() {
                $scope.name = entry.data.name;
                $scope.uname = entry.data.uname;
                $scope.age = entry.data.age;
                $scope.qualification = entry.data.qualification;
                $scope.id = entry.data._id;
            });
            //$scope.data = entry.data;
        }
    }
    
    $scope.saveUser = function (id) {
        
        $scope.newUserSave = new userService(); //this object now has a $save() method
        $scope.newUserSave._id = id;
        $scope.newUserSave.name =  $scope.name;
        $scope.newUserSave.uname = $scope.uname;
        $scope.newUserSave.age = $scope.age;
        $scope.newUserSave.qualification = $scope.qualification;
        $scope.newUserSave.password = $scope.password;
        
        var response = userService.save($scope.newUserSave,function() {
                $scope.name = '';
                $scope.uname = '';
                $scope.age = '';
                $scope.qualification = '';
                $scope.password = '';
                $scope.id = '';
                $scope.edit = true;
                $scope.incomplete = true;
        });
        var entry = userService.get(function() {
                $scope.data = entry.data;
           });
         
    }
    
     $scope.deleteUser = function(id) {
        
        if (id) {
            //userService.data = "shais";
            var entry = userService.update({_id : id, op : 'delete'},function() {
                var entry = userService.get(function() {
                                $scope.data = entry.data;
                           });
            });
            //$scope.data = entry.data;
        }
    }
}])




.controller('StoryCtrl', ['$scope','$rootScope','$location','$http','storyService','Upload','userService', function($scope,$rootScope,$location,$http,storyService,Upload,userService) {
    $scope.data = '';
    $scope.edit = true;
    var entry = storyService.get(function() {
         $scope.data = entry.data;
    });
    
    var dataUser = '';
     var userData = userService.get(function() {
         $scope.userData = userData.data;
         dataUser = userData.data;
    });
    console.log($scope.userData);
    
    $scope.disable = true;
    if ($scope.headline != '') {
        $scope.disable = false;
    }
    
    $scope.editStory = function(id) {
        
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.headline = '';
            $scope.description = '';
            $scope.photo = '';
            $scope.story_by = '';
            $scope.user_id = '';
            
        } else {
            $scope.edit = false;
            $scope.incomplete = false;
            var entry = storyService.get({id : id},function() {   
                $scope.id = entry.data._id;
                $scope.headline = entry.data.headline;
                $scope.description = entry.data.description;
                $scope.photo = entry.data.photo;
                $scope.story_by = entry.data.story_by;
                $scope.user_id = entry.data.user_id;
            });
            //$scope.data = entry.data;
        }
    }
    
    
    $scope.saveStory = function (id) {
        if ($scope.newphoto) {
            $scope.photo = '';
        }
       
        $scope.newStorySave = new storyService(); //this object now has a $save() method
        $scope.newStorySave._id = id;
        $scope.newStorySave.user_id =  $scope.user_id;
        
        $scope.newStorySave.headline =  $scope.headline;
        $scope.newStorySave.description = $scope.description;
        $scope.newStorySave.story_by = $scope.story_by;
        $scope.newStorySave.photo = $scope.photo;
        $scope.newStorySave.newphoto = $scope.newphoto;
        
        //console.log($scope.newphoto);
        var files =$scope.newphoto;
        if (files) {
              Upload.upload({
                    url: '/admin/manageStories',
                    fields: {_id : id,headline: $scope.headline,description:$scope.description,story_by: $scope.story_by,user_id : $scope.user_id._id},
                    file: files
                }).success(function (data, status, headers, config) {
                    $location.path('/');
                });
        } else {
            var response = storyService.save($scope.newStorySave,function() {
                $scope.headline = '';
                $scope.description = '';
                $scope.photo = '';
                $scope.story_by = '';
                $scope.user_id = '';
                $scope.id = '';
                $scope.edit = true;
                $scope.incomplete = true;
            });
        }
        
        
        
        
      
        
        var entry = storyService.get(function() {
                $scope.data = entry.data;
           });
         
    }
    
     $scope.deleteStory = function(id) {
        
        if (id) {
            //userService.data = "shais";
            var entry = storyService.update({_id : id, op : 'delete'},function() {
                var entry = storyService.get(function() {
                                $scope.data = entry.data;
                           });
            });
        }
    }
    
}])