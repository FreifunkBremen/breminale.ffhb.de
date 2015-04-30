'use strict';

angular.module('breminaleApp')
	.controller('SignupSessionCtrl', function ($scope,$rootScope,session, socket) {
		$rootScope.NAVBAR = '';

		$scope.obj = {name:'',mail:'',password:''};

		$scope.signup = function(){
			if($scope.repeat_password != $scope.obj.password){
				$scope.form_error = true;
				$scope.form_success = false;
			}else{
				$scope.loading = true;
				socket.emit('api::session::signup',$scope.obj,function(result){
					if(result.s){
						$scope.form_error = false;
						$scope.form_field_error = {};
						session.update(result);
						$scope.form_success = true;
					}else{
						$scope.form_error = true;
						$scope.form_field_error = result.form.field;
						session.update(result);
						$scope.form_success = false;
					}
					$scope.loading = false;
				});
			}
		};
	});
