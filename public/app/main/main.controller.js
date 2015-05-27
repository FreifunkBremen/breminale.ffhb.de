'use strict';

angular.module('breminaleApp')
	.controller('MainCtrl',['$scope','$rootScope','$http',function ($scope,$rootScope,$http) {
		$rootScope.NAVBAR = 'Home';
		$http.get('/data.php')
			.success(function(result){
				$scope.result = result;
			});
	}]);
