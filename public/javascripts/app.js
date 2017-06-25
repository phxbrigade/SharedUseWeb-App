var app = angular.module('SharedUseWeb', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
