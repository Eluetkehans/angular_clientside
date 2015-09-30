var Ip = require(__dirname + "/../models/ip");

module.exports = function(req, res, callback) {
  // if the users ip isn't in the database, add it.
  Ip.find({ 'ipAddress': req.ip }, function(err, docs) {
    if (err) console.log(err);
    if(!docs.length) {
      var ipLog = new Ip({ 'ipAddress': req.ip, 'visits': 0 });
      ipLog.save();
    }
  });
  // increment visits of ip address by one, initiate callback
  Ip.update({ 'ipAddress': req.ip }, { $inc: { 'visits': 1}},
            { 'multi': false}, callback(req, res));
}