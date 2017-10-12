var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
    
    $http.get('/api')
        .then(function (result) {
            $scope.willvisit = result.data;
        }, function (data, status) {
            console.log(data);
        });
    
    $http.get('/api2')
        .then(function (result) {
            $scope.visited = result.data;
        }, function (data, status) {
            console.log(data);
        });
}]);