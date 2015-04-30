'use strict';

angular.module('breminaleApp')
.factory('notification', function ($rootScope,$cookieStore,session,socket) {

	if(typeof $rootScope.session.notify === 'undefined')
		$rootScope.session.notify = false;

	var _notifications = [];


	socket.on('notification::push',function(result){
		_notifications.push(result);
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


	function _toggle(){
		socket.emit('notification::active::set',!$rootScope.session.notify,function(result){
			session.update(result);
			if($rootScope.session.notify && Notification.permission !== 'granted'){
				Notification.requestPermission();
			}
		});

	};

	function _getAll(){
		socket.emit('notification::all',function(result) {
			angular.copy(result.items, _notifications);
			session.update(result);
		});
	}
	return {
		toggle:_toggle,
		notifications:_notifications,
		getAll:_getAll
	};
});
