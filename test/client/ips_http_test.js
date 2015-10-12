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
      expect($scope.newIp).toBe({});
    });

    it('should be able to update an existing ip', function() {
      $scope.ips[0] = {_id: 1, ipAddress: 'updated ip'};
      $httpBackend.expectPUT('/api/ips/1', {_id: 1, ipAddress: 'updated ip', status: 'pending'})
        .respond(200, {_id: 1, ipAddress: 'updated ip'});
      $scope.updateIp({_id: 1, ipAddress: 'updated ip'});
      $httpBackend.flush();
      expect($scope.ips[0].ipAddress).toBe('updated ip');
      expect($scope.ips[0].ipAddress.status).toBe(undefined);
    });

    it('should be able to remove and ip address', function() {
      $scope.ips[0] = {_id: 1, ipAddress: 'delete test'};
      $httpBackend.expectDELETE('/api/ips/1')
        .respond(200, {msg: 'success'});
      $scope.removeIp($scope.ips[0]);
      $httpBackend.flush();
      expect($scope.ips[0]).toBe(undefined);
    });
  });
});