module.exports = function(app) {
  require('./controllers/ips_controller')(app);
  require('./directives/ip_form_directive')(app);
};