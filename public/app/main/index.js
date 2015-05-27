'use strict';

angular.module('breminaleApp')
  .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url:'/',
        templateUrl: 'app/main/main.html',
        controller: function($rootScope){
          $rootScope.NAVBAR = 'Home';
        }
      })
      .state('about', {
        url:'/about',
        templateUrl: 'app/main/about.html',
        controller: function($rootScope){
          $rootScope.NAVBAR = 'About';
        }
      });
  }]);
