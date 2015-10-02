var express = require('express');
var Ip = require(__dirname + "/../models/ip");
var ipLogger = require(__dirname + "/../lib/ip_logger");
var jsonParser = require('body-parser').json();
var ipRoute = module.exports = exports = express.Router();
var handleError = require(__dirname + "/../lib/handel_error");

ipRoute.get('/ips', function(req, res) {
  ipLogger(req, res, function(req, res) {
    Ip.find({}, function(err, docs) {
      debugger;
      if (err) return handleError(err, docs);
      res.json(docs);
    });
  });
});

ipRoute.post('/ips', jsonParser, function(req, res) {
  var newIp = new Ip(req.body);
  newIp.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

ipRoute.put('/ips/:id', jsonParser, function(req, res) {
  var newIpBody = req.body;
  delete newIpBody._id;
  Ip.update({_id: req.params.id}, newIpBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

ipRoute.delete('/ips/:id', function(req, res) {
  Ip.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});