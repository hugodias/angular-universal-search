'use strict';


var universalSearchApp = angular.module('universalSearchApp', ['ngResource']);

universalSearchApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'universalSearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
