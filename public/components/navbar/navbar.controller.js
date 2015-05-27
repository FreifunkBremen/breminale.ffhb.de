'use strict';

angular.module('breminaleApp')
	.controller('NavbarCtrl', ['$scope',function ($scope) {
		$scope.toggleMenu = function(){
			$('#navbarSidebar').sidebar('toggle');
		};
	}]);
