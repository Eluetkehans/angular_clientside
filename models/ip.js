var mongoose = require('mongoose');

var ipSchema = new mongoose.Schema({
  ipAddress: String,
  visits: Number
});

module.exports = mongoose.model('Ip', ipSchema);