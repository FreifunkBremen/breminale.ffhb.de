'use strict';

angular.module('breminaleApp')
	.controller('MainCtrl',function ($scope,$rootScope, socket) {
		$rootScope.NAVBAR = 'Home';

		socket.emit('api::things',function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});

	});
