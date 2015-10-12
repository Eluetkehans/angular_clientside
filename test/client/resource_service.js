require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('ipsApp'));

  var ResourceService;
  var $httpBackend;
  var ipsResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    ipsResource = ResourceService('ips');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get requests', function() {
    $httpBackend.expectGET('/api/ips').respond(200, [{ipAddress: 'test ip', _id:1}]);
    ipsResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should create new ips', function() {
    $httpBackend.expectPOST('/api/ips').respond(200, {ipAddress: 'create test', _id:1});
    ipsResource.create({ipAddress: 'create test',_id: 1}, function(err, data) {
      expect(err).toBe(null);
      expect(data.ipAddress).toBe('create test');
    });
    $httpBackend.flush();
  });

  it('should update an existing resource', function() {
    $httpBackend.expectPUT('/api/ips/1').respond(200, {ipAddress: 'put test', _id: 1});
    ipsResource.update({ipAddress: 'put test', _id: 1}, function(err, data) {
      expect(err).toBe(null);
      expect(data.ipAddress).toBe('put test');
    });
    $httpBackend.flush();
  });

  it('should delete a resource', function() {
    $httpBackend.expectDELETE('/api/ips/1').respond(200, {ipAddress: 'delete test', _id: 1});
    ipsResource.remove({ipAddress: 'delete test', _id: 1}, function(err, data) {
      expect(err).toBe(null);
      expect(data.ipAddress).toBe('delete test');
    });
    $httpBackend.flush();
  });
});