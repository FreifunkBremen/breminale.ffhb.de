'use strict';

angular.module('breminaleApp')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'app/session/login.html',
				controller: 'LoginSessionCtrl'
			});
	});
