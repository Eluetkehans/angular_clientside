module.exports = function(app) {
  app.directive('ipForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/ips/directives/ip_form_template.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        ip: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    };
  });
};