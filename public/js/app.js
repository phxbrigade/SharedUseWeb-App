var app = angular.module('SharedUseWeb', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'MainController'
    })
})
