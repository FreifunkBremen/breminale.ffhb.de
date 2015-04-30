'use strict';

angular.module('breminaleApp')
	.controller('NotificationManageCtrl',function ($scope,$rootScope,session, socket) {
		$rootScope.NAVBAR = 'Notification';

		$scope.sendTest = function(){
			socket.emit('notification::push',function(result) {
				$scope.items = result.items;
				session.update(result);
			});
		};
	});
