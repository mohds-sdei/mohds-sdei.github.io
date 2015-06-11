
angular.module('loginController',[])

.controller('LoginCtrl', ['$scope','indexService', function($scope,indexService) {
   
    $scope.name = indexService.getName();
    $scope.lastname = indexService.getLastName();
    //$location.path('/');
    
}]);
//
//function IndexCtrl ($scope,indexService) {
//    $scope.name = indexService.getName();
//    $scope.lastname = indexService.getLastName()
//}