require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var ipsApp = angular.module('ipsApp', ['ngRoute', 'base64', 'ngCookies']);

// Order matters. Services, directives, then resources
require('./services/services')(ipsApp);
require('./ips/ips')(ipsApp);
require('./users/users')(ipsApp);
require('./logout')(ipsApp);
require('./router')(ipsApp);