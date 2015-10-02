require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('ips controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('ipsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    // Breaking here on ipsController
    var controller = new $ControllerConstructor('ipsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.ips)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('ipsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get requests when getAll() is called', function() {
      $httpBackend.expectGET('/api/ips').respond(200, [{ipAddress: 'test ip'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.ips[0].ipAddress).toBe('test ip');
    });

    it('should be able to create a new ip', function() {
      $httpBackend.expectPOST('/api/ips', {ipAddress: 'send test ip'})
        .respond(200, {_id: 1, ipAddress: 'test ip'});
      $scope.newIp = {ipAddress: "0.0.0.0"};
      $scope.createIp({ipAddress: 'send test ip'});
      $httpBackend.flush();
      expect($scope.ips[0].ipAddress).toBe('test ip');
      expect($scope.newIp).toBe(null);
    });
  });
});