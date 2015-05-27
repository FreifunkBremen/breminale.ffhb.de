'use strict';

angular.module('breminaleApp')
	.controller('FeedCtrl',['$scope','$rootScope','$http',function ($scope,$rootScope,$http) {
		$rootScope.NAVBAR = 'Feed';
		$scope._filter = '';
		$http.get('/data.php')
			.success(function(result){
				$scope.list = result.feed;
				$scope.lastUpdate = result.lastUpdate;
				$scope.Iterator = result.Iterator;
			});
		$scope.setFilter = function(args){
			$scope._filter = args;
		};
	}]);
