'use strict';

angular.module('breminaleApp')
	.controller('HeaderCtrl', function ($scope, $interval,session, socket) {
		$interval(function(){
			$scope.connected = socket.emit('main::ping',function(result){
				session.update(result);
			}).connected;
		},5000);
	});
