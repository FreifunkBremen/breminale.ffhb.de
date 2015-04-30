'use strict';

angular.module('breminaleApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'gettext',
	'btford.socket-io'
])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true).hashPrefix('!');
	})
	.factory('socket', function (socketFactory) {
		return socketFactory({
			prefix: '',
			ioSocket: io.connect({path:'/ws'})
		});
	})
	.run(function(gettextCatalog,socket){
		gettextCatalog.currentLanguage = 'de';
		gettextCatalog.debug = true;
	})
