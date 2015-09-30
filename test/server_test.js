var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
process.env.MONGO_URL = 'mongodb://localhost/ips_dev';
var Ip = require(__dirname + "/../models/ip");

chai.use(chaiHttp);
require(__dirname + '/../server.js');

describe('the ips resource', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) console.log(err);
      done();
    });
  });

  it('should retrieve ips', function(done) {
    chai.request(url)
      .get('/ip')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  describe('db return', function() {
    var dbResults;
    before(function(done) {
      Ip.find({ 'ipAddress': '::ffff:127.0.0.1' }, function(err, docs) {
        dbResults = docs;
        done();
      });
    });
    it('should log ips that visit', function(done) {
    chai.request(url)
      .get('/ip')
      .end(function(err, res) {
        expect(dbResults).to.not.eql([]);
        done();
      });
    });
  });
});