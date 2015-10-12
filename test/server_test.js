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
    before(function(done) {
      var newIp = new Ip();
      newIp.ipAddress = '::ffff:127.0.0.1';
      newIp.visits = 1;
      newIp.save(function() {
        Ip.find({ 'ipAddress': '::ffff:127.0.0.1' }, function(err, docs) {
          debugger;
          dbResults = docs;
          done();
        });
      });
      
    });
    it('should log ips that visit', function(done) {
    chai.request(url)
      .get('/ip')
      .end(function(err, res) {
        Ip.findOne({ 'ipAddress': '::ffff:127.0.0.1' }, function(err, doc) {
          debugger;
          expect(doc.visits).to.eql(1);
        });
      });
    });
  });
});