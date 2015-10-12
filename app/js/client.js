require('angular/angular');

var ipsApp = angular.module('ipsApp', []);

// Order matters. Services, directives, then resources
require('./services/services')(ipsApp);
require('./ips/ips')(ipsApp);