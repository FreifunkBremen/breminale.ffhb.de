'use strict';

angular.module('breminaleApp')
	.controller('NotificationViewCtrl',function ($scope,$rootScope,session, socket,notification) {
		$rootScope.NAVBAR = 'Notification';
		$scope._filter = '';
		$scope.notifyToggle = notification.toggle;

		notification.getAll();
		$scope.items = notification.notifications;

		$scope.setFilter = function(tmp){
			$scope._filter=tmp;
		};
	});
