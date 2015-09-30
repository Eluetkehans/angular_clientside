var express = require('express');
var Ip = require(__dirname + "/../models/ip");
var ipLogger = require(__dirname + "/../lib/ip_logger");

var ipRoute = module.exports = exports = express.Router();

ipRoute.get('/ip', function(req, res) {
  ipLogger(req, res, function(req, res) {
    Ip.find({}, function(err, data) {
      if (err) console.log(err);
      res.json(data);
    });
  });  
});