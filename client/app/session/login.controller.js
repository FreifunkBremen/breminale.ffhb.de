'use strict';

angular.module('breminaleApp')
	.controller('LoginSessionCtrl', function ($scope,$rootScope,session, socket) {
		$rootScope.NAVBAR = 'Login';

		$scope.obj = {mail:'',password:''};

		$scope.login = function(){
			$scope.loading = true;
			socket.emit('api::session::login',$scope.obj,function(result){
				if(result.s){
					$scope.form_error = false;
					$scope.form_field_error = {};
					session.update(result);
				}else{
					$scope.form_error = true;
					$scope.form_field_error = result.form.field;
					session.update(result);
				}
				$scope.loading = false;
			});
		};
	});
