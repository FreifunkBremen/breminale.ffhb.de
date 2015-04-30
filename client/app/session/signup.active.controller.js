'use strict';

angular.module('breminaleApp')
	.controller('SignupActiveSessionCtrl', function ($scope,$rootScope,$routeParams,session, socket) {
		$rootScope.NAVBAR = '';

		$scope.obj = {mail:$routeParams.mail||'',code:$routeParams.code||''};

		$scope.active = function(){
			$scope.loading = true;
			socket.emit('api::session::signup::active',$scope.obj,function(result){
				if(result.s){
					$scope.name = result.data.name;
					$scope.form_error = false;
					$scope.form_field_error = {};
					session.update(result);
					$scope.form_success = true;
				}else{
					$scope.name = '';
					$scope.form_error = true;
					$scope.form_field_error = result.form.field;
					session.update(result);
					$scope.form_success = false;
				}
				$scope.loading = false;
			});
		};

		if(typeof($routeParams.mail) !== 'undefined' && typeof($routeParams.code) !== 'undefined'){
			$scope.active();
		}

	});
