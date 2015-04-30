'use strict';

angular.module('breminaleApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/notification', {
        templateUrl: 'app/notification/view.html',
        controller: 'NotificationViewCtrl'
      })
      .when('/notification/manage', {
        templateUrl: 'app/notification/manage.html',
        controller: 'NotificationManageCtrl'
      });
  });
