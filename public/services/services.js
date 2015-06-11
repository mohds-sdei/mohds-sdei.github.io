angular.module('services', [])

.factory('indexService', function($http) {
    return {
            getName : function() {
                var name = "Shais";
                return name;
            },
            getLastName : function () {
                var name = "JOHNSON";
                return name;
            }
            
        }    
    
})
.factory('loginService', function($http) {
    return {
            postLoginData : function() {
                $http.get("http://www.w3schools.com/angular/customers.php")
                    .success(function(response) { status = response.status; return status;});
            },
            getLastName : function () {
                var name = "JOHNSON";
                return name;
            }
            
        }    
    
})

.factory('CheckSession', function($http) {
    return {
            checkSessionStatus : function() {
                $http.get("/checkSession")
                    .success(function(response) { status = response.status; return status;});
            }
            
        }    
    
})

.factory('loggedInStatus', function ($http) {
    var loggedIn = "";

    return {
                getStatus: function () {
                return loggedIn;
            },
                setStatus: function (value) {
                loggedIn = value;
            }
    };
})