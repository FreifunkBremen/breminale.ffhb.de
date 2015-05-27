'use strict';

angular.module('breminaleApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'gettext'
])
	.config(['$urlRouterProvider','$locationProvider',function ($urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$locationProvider.html5Mode(true).hashPrefix('!');
	}])
	.run(function(gettextCatalog){
		gettextCatalog.currentLanguage = 'de';
		gettextCatalog.debug = true;
	})
