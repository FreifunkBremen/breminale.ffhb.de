'use strict';

angular.module('breminaleApp')
.factory('notification', function ($rootScope,$cookieStore,session,socket) {
	if(typeof $rootScope.session.notify === 'undefined')
		$rootScope.session.notify = false;

	var _toggle = function(){
		socket.emit('notification::active::set',!$rootScope.session.notify,function(result){
			session.update(result);
			if($rootScope.session.notify && Notification.permission !== 'granted'){
				Notification.requestPermission();
			}
		});

	};

	socket.on('notification::push',function(result){
		if($rootScope.session.notify){
			if(Notification.permission == 'granted'){
				var n = new Notification( result.title, {
					body: result.text,
					icon : result.image
				});
			}else{
				alert(result.title);
			}
		}
	});

	return {
		toggle:_toggle
	};
});
