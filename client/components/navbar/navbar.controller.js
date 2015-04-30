'use strict';

angular.module('breminaleApp')
	.controller('NavbarCtrl', function ($scope, session, socket) {
		$scope.showMenu = false;

		$scope.logout = function(){
			socket.emit('api::session::logout',function(result){
				session.update(result);
			});
		};
	});
