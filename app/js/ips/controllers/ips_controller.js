// the $scope string in front of the function allows it to be uglified
// without causing problems
module.exports = function(app) {
  app.controller('ipController', ['$scope', '$http', function($scope, $http) {
    $scope.greeting = 'stranger';
    $scope.ips = [];

    $scope.getAll = function() {
      $http.get('/api/ips')
        //takes a callback for success, then a callback for failure
        .then(function(res) {
          $scope.ips = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    // These functions don't necessarily make sense for this app, but for
    // the sake of proving concepts they are included.
    $scope.createIp = function(ip) {
      $http.post('/api/ips', ip)
        .then(function(res) {
          $scope.ips.push(res.data);
          $scope.newIp = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.updateIp = function(ip) {
      // use css on pending to give users instant feedback that something
      // is happening
      ip.status = 'pending';
      $http.put('/api/ips/' + ip._id, ip)
        .then(function(res) {
          delete ip.status;
          ip.editing = false;
        }, function(res) {
          console.log(res);
          ip.status = 'failed';
          ip.editing = false;
        });
    };

    $scope.removeIp = function(note) {
      note.status = 'pending';
      $http.delete('/api/ips/' + ip._id)
        .then(function() {
          $scope.ips.splice($scope.notes.indexOf(ip), 1);
        }, function(res) {
          ip.status = 'failed';
          console.log(res);
        });
    };
  }]);
};