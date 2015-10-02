var Ip = require(__dirname + "/../models/ip");

module.exports = function(req, res, callback) {
  // if the users ip isn't in the database, add it.
  Ip.findOne({ 'ipAddress': req.ip }, function(err, doc) {
    debugger;
    if (err) console.log(err);
    if(!doc) {
      var ipLog = new Ip({ 'ipAddress': req.ip, 'visits': 1 });
      return ipLog.save();
    }
    // increment visits of ip address by one, initiate callback
    Ip.findOneAndUpdate({ 'ipAddress': req.ip }, { $inc: { 'visits': 1}},
                callback(req, res));
  });
};