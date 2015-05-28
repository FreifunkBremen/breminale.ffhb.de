'use strict';

angular.module('breminaleApp')
  .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url:'/',
        templateUrl: 'app/main/main.html'
      })
      .state('about', {
        url:'/about',
        templateUrl: 'app/main/about.html'
      });
  }]);
