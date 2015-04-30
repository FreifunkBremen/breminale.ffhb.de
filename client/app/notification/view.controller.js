'use strict';

angular.module('breminaleApp')
	.controller('NotificationViewCtrl',function ($scope,$rootScope,session, socket,notification) {
		$rootScope.NAVBAR = 'Notification';
		$scope._filter = '';
		$scope.notifyToggle = notification.toggle;

		socket.emit('notification::all',function(result) {
			$scope.items = result.items;
			session.update(result);
		});

		$scope.setFilter = function(tmp){
			$scope._filter=tmp;
		};
	});
