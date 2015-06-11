angular.module('starter.services', [])


.factory('login',function ($resource) {
   return $resource('/admin/login'); 
})
.factory('logout',function ($resource) {
   return $resource('/admin/logout'); 
})
.factory('isAuthenticated',function ($resource) {
   return $resource('/admin/checkSession'); 
})
.factory('users',function ($resource) {
   return $resource('/admin/manageUsers/:id', { id: '@_id' }); 
});
