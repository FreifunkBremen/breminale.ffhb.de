'use strict';

angular.module('breminaleApp')
	.controller('FeedCtrl',['$scope','$http',function ($scope,$http) {
		$scope._filter = '';

		$scope.refresh = function(){
			$scope.loading = true;
			$http.get('/data.php')
				.success(function(result){
					$scope.list = result.feed;
					$scope.lastUpdate = result.lastUpdate;
					$scope.Iterator = result.Iterator;
					$scope.loading = false;
				});
		};
		$scope.refresh();
		$scope.setFilter = function(args){
			$scope._filter = args;
		};
	}]);
