angular.module('productServices', [])

.factory('addCategoryService', function($http,$resource) {
    return $resource('/admin/addCategory');     
    
})

.factory('addSubCategoryService', function($http,$resource) {
    return $resource('/admin/addSubCategory/:id',{id : '@_id'});     
    
})

.factory('addProduct', function($http,$resource) {
    return $resource('/admin/addProduct/:id',{id : '@_id'});     
    
})