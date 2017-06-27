var app = angular.module('SharedUseWeb', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html'
    })
    .when('/#', {
      templateUrl: 'partials/main.html'
    })
    .when('/about', {
      templateUrl: 'partials/aboutSharedUse.html'
    })
    .when('/codeforPHX', {
      templateUrl: 'partials/codeforPHX.html'
    })
    .when('/contactt', {
      templateUrl: 'partials/contact.html'
    })
    .when('/sites', {
      templateUrl: 'partials/sites.html'
    })
    .when('/sites/cultivatesouthphx', {
      templateUrl: 'partials/cultivatesouthphx.html'
    })
    .when('/sites/garfield', {
      templateUrl: 'partials/garfield.html'
    })
    .when('/sites/kiser', {
      templateUrl: 'partials/kiser.html'
    })
    .when('/sites/nadaburg', {
      templateUrl: 'partials/nadaburg.html'
    })
    .when('/sites/solano', {
      templateUrl: 'partials/solano.html'
    })
    .when('/sites/wilson', {
      templateUrl: 'partials/wilson.html'
    })
    .otherwise({
      redirectTo: '/'
    })
})
