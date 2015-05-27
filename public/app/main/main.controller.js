'use strict';

angular.module('breminaleApp')
	.controller('MainCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
		$rootScope.NAVBAR = 'Home';
	}]);
