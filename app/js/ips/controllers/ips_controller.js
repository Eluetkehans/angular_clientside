// the $scope string in front of the function allows it to be uglified
// without causing problems
module.exports = function(app) {
  app.controller('ipsController', ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {
    
    var eat = $cookies.get('eat');
    if (!(eat && eat.length)) $location.path('/signup');
    $http.defaults.headers.common.token = eat;

    $scope.greeting = 'stranger';
    $scope.ips = [];
    $scope.newIp = {};
    var ipResource = Resource('ips');

    $scope.getAll = function() {
      ipResource.getAll(function(err, data) {
        if (err) return console.log(err);
        $scope.ips = data;
      });
    };

    // These functions don't necessarily make sense for this app, but for
    // the sake of proving concepts they are included.
    $scope.createIp = function(ip) {
      ipResource.create(ip, function(err, data) {
        if (err) return console.log(err);
        $scope.newIp = null;
        $scope.ips.push(data);
      });
    };

    $scope.updateIp = function(ip) {
      ipResource.update(ip, function(err) {
        ip.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.removeIp = function(ip) {
      ipResource.remove(ip, function(err) {
        if (err) return console.log(err);
        $scope.ips.splice($scope.ips.indexOf(ip), 1);
      });
    };
  }]);
};