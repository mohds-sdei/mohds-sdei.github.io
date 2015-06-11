angular.module('productControllers',[])

.controller('CategoryCtrl', ['$scope','$rootScope','addCategoryService', function ($scope,$rootScope,addCategoryService) {
    var categories = addCategoryService.get(function() {
         $scope.categories = categories.data;
    });
}])


.controller('addCategoryCtrl', ['$scope','$rootScope','$http','$location','addCategoryService', function($scope,$rootScope,$http,$location,addCategoryService) {
   $scope.errmsg = "";
   
    $scope.addCat = function(data) {
        
    
    $scope.newCatSave = new addCategoryService(); //this object now has a $save() method
        
    $scope.newCatSave.name =  data.name;
    $scope.newCatSave.detail = data.detail;
        
    var response = addCategoryService.save($scope.newCatSave,function() {
           if (response.status == true) {
                $scope.data = "";
                $scope.errmsg = response.msg;
           } else {
                $scope.errmsg = response.msg;
           }
    });
    
    
    }  
    
    
}])


.controller('addSubCategoryCtrl', ['$scope','$rootScope','$http','$location','addCategoryService','addSubCategoryService', function($scope,$rootScope,$http,$location,addCategoryService,addSubCategoryService) {
   $scope.errmsg = "";
   
   var categories = addCategoryService.get(function() {
         $scope.categories = categories.data;
    });
   
    $scope.addSubCat = function(data) {
        
    
    $scope.newSubCatSave = new addSubCategoryService(); //this object now has a $save() method
    
    $scope.newSubCatSave.category_id =  data.category_id;
    $scope.newSubCatSave.name =  data.name;
    $scope.newSubCatSave.detail = data.detail;
        
    var response = addSubCategoryService.save($scope.newSubCatSave,function() {
           if (response.status == true) {
                $scope.data = "";
                $scope.errmsg = response.msg;
           } else {
                $scope.errmsg = response.msg;
           }
    });
    
    
    }  
    
    
}])



.controller('addProductCtrl', ['$scope','$rootScope','$routeParams','$http','$location','addCategoryService','addSubCategoryService','addProduct','Upload', function($scope,$rootScope,$routeParams,$http,$location,addCategoryService,addSubCategoryService,addProduct,Upload) {
    
    $scope.errmsg = '';
    $scope.param = $routeParams.id;
    var prod_id = $scope.param;
    
    
    var categories = addCategoryService.get(function() {
         $scope.categories = categories.data;
    });
    $scope.clearDropdown = function () {
        $scope.subcategories = '';
    }
    
     $scope.fetchSubCat = function (id) {
        
        //console.log(id);
        var subcategories = addSubCategoryService.get({id : id}, function() {
            $scope.subcategories = subcategories.data;
        });
        
        
    }
    
    if (prod_id) {
        var response = addProduct.get({id : prod_id},function() {
            var prod_detail = response.data;
            
            var subcategories = addSubCategoryService.get({id : prod_detail.category_id._id}, function() {
                $scope.subcategories = subcategories.data;
            });
            
            $scope.data = { "name" : prod_detail.name,
                            "detail" : prod_detail.detail,
                            "category_id" : prod_detail.category_id._id,
                            "subcategory_id" : prod_detail.subcategory_id
            };
            
            
        });
    }
    
    $scope.saveProduct = function (data) {
        $scope.myData = new addProduct();
        $scope.myData = data;
        $scope.myData._id = prod_id;
             
        
        var files =data.image;
        if (files) {
              Upload.upload({
                    url: '/admin/addProduct',
                    fields: { _id : prod_id,name: data.name,detail: data.detail,category_id : data.category_id,subcategory_id : data.subcategory_id},
                    file: files
                }).success(function (data, status, headers, config) {
                
                    $scope.data = "";
                    $scope.errmsg = data.msg;
                    $location.path('/manageProducts');
                });
        } else {
            var response = addProduct.save($scope.myData,function() {
               if (response.status == true) {
                    $scope.data = "";
                    $scope.errmsg = response.msg;
                    $location.path('/manageProducts');
               } else {
                    $scope.errmsg = response.msg;
               }
            });
        }   
    }
    
}])

.controller('ProductCtrl', ['$scope','$rootScope','$http','$location','addCategoryService','addSubCategoryService','addProduct','Upload', function($scope,$rootScope,$http,$location,addCategoryService,addSubCategoryService,addProduct,Upload) {
    
    $scope.errmsg = '';
    var products = addProduct.get(function() {
         $scope.products = products.data;
    });
    
   
 
    
    
    
}])
