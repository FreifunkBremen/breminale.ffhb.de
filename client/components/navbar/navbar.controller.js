'use strict';

angular.module('breminaleApp')
	.controller('NavbarCtrl', function ($scope, session, socket) {
		$('#navbar.ui.sticky').visibility({offset: 14,type: 'fixed'});
		$scope.showMenu = false;

		$scope.logout = function(){
			socket.emit('api::session::logout',function(result){
				session.update(result);
			});
		};
	});
