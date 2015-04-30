'use strict';

angular.module('breminaleApp')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'app/session/login.html',
				controller: 'LoginSessionCtrl'
			})
			.when('/signup', {
				templateUrl: 'app/session/signup.html',
				controller: 'SignupSessionCtrl'
			})
			.when('/active/:mail/:code', {
				templateUrl: 'app/session/signup_active.html',
				controller: 'SignupActiveSessionCtrl'
			})
			.when('/active', {
				templateUrl: 'app/session/signup_active.html',
				controller: 'SignupActiveSessionCtrl'
			});
	});
