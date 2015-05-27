'use strict';

angular.module('breminaleApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url:'/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('index2', {
        url:'/hallo',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
