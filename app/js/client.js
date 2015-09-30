require('angular/angular');

var ipApp = angular.module('ipApp', []);

// the $scope string in front of the function allows it to be uglified
// without causing problems
ipApp.controller('ipController', ['$scope', function($scope) {
  $scope.greeting = 'stranger';
}]);