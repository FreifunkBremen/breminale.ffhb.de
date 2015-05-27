'use strict';

angular.module('breminaleApp')
  .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('feed', {
        url:'/feed',
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedCtrl'
      });
  }]);
