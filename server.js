var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/ips_dev');
// tokens encode and decode with this APP_SECRET to make sure we know
// those tokens actually came from our server.
process.env.APP_SECRET = process.env.APP_SECRET || 'setupanappsecretplease';

var ipRouter = require(__dirname + "/routes/ip_route");
var usersRouter = require(__dirname + '/routes/users_routes');
var port = 3000;
app.use('/api', ipRouter);
app.use('/api', usersRouter);

app.listen(port, function() {
  console.log('server listening to port: ' + port);
});