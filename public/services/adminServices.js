angular.module('adminServices', [])


.factory('loginService', function($http,$resource) {
    return $resource('/admin/login');     
    
})

.factory('dashboardService', function($http,$resource) {
    return {
            getUserCount : function() {
                return $resource('/admin/countUsers');     
            },
            getStoryCount : function () {
                return $resource('/admin/countStories');  
            }
            
        }    
    
})

.factory('userService', function($http,$resource) {
    
            return $resource('/admin/manageUsers/:id', { id: '@_id' }, {
    update: {
      method: 'POST'
    }
       });     
})

.factory('storyService', function($http,$resource) {
    
            return $resource('/admin/manageStories/:id', { id: '@_id' }, {
    update: {
      method: 'POST'
    }
       });     
})