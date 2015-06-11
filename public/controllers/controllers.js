
angular.module('controllers',[])

.controller('IndexCtrl', ['$scope','$rootScope','$http','indexService','loggedInStatus', function($scope,$rootScope,$http,indexService,loggedInStatus) {
   
   
    $scope.name = indexService.getName();
    $scope.lastname = indexService.getLastName();
    $scope.noStory = false;
    $scope.data = '';
        
            $http.get("/fetchStories")
                    .success(function(response) {
                        
                        var data = response.data;
                        var result = JSON.stringify(data);
                        
                        if (result !='[]') {
                            $scope.data = data;
                        } else {
                            $scope.noStory = true; 
                        }
                    });
   
    
    
    
}])
.controller('HeaderCtrl', ['$scope','$rootScope','$http','indexService','loggedInStatus','$location', function($scope,$rootScope,$http,indexService,loggedInStatus,$location) {
    $rootScope.loggedIn = true;
    $rootScope.loggedOut = false;
   
    $scope.logout = function () {
                window.location = '/logout';
            };
   
    $rootScope.noStory = false;
    $rootScope.data = '';
   $scope.getSearchData = function(data) {
    //alert();
        $http.get("/fetchStories/?search="+data.search)
                    .success(function(response) {
                        
                        var data = response.data;
                        var result = JSON.stringify(data);
                        
                        if (result !='[]') {
                            $rootScope.data = data;
                            $location.path('/search');
                        } else {
                            $rootScope.noStory = true;
                            //$location.path('/');
                        }
                         
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Error found');
                        if (status == '401') {
                            $scope.errmsg = 'Invalid username or password.';
                        } else {
                            $scope.errmsg = 'Unable to process your request.';   
                        }
                         
                    });
   };
   
    $http.get("/checkSession")
                    .success(function(response) {
                        
                        var status = response.status; 
                        if (status == 'false') {
                            $rootScope.loggedIn = false;
                            $rootScope.loggedOut = true;
                            $rootScope.username = '';
                        }
                    });
   
    
    
    
}])
.controller('LoginCtrl', ['$scope','$rootScope','$location','$http','$cookieStore','loginService','loggedInStatus', function($scope,$rootScope,$location,$http,$cookieStore,loginService,loggedInStatus) {
   
   $scope.userdata = '';
    $scope.errmsg = ''
    $rootScope.username = '';
    $scope.loginFunction = function(data) {
       // alert('-u-'+data.username+'-p-'+data.password);
       $http.post("/login",data)
                    .success(function(response) {
                        
                        status = response.status;
                         //console.log('Status : '+status);
                         
                         $scope.errmsg = 'Successfully logged in. Redirecting...';
                         $rootScope.loggedIn = true;
                         $rootScope.username = response.Username;
                         $rootScope.loggedOut = false;
                         $location.path('/upload');
                         
                    })
                    .error(function(data, status, headers, config) {
                        $rootScope.loggedIn = false;
                        $rootScope.loggedOut = true;
                        if (status == '401') {
                            $scope.errmsg = 'Invalid username or password.';
                        } else {
                            $scope.errmsg = 'Unable to process your request.';   
                        }
                         
                    });
    };
    $scope.lastname = loginService.getLastName();
    //$location.path('/');
    
}])

.controller('UploadCtrl', ['$scope','Upload','$location','$http', function($scope,Upload,$location,$http) {
   
   $scope.errmsg = '';
        
            $http.get("/checkSession")
                    .success(function(response) {
                        
                        var status = response.status; 
                        if (status == 'false') {
                            $location.path('/login');
                        }
                    });

    $scope.uploadFunction = function(data) {
        
        console.log(data);
        var file1 = data;
        var file = data.photo;
        Upload.upload({
                    url: '/upload',
                    fields: {headline: data.headline,description:data.description},
                    file: file
                }).success(function (data, status, headers, config) {
                    $location.path('/');
                });
                
       
    };
    
    
   
    
    
    
}]);