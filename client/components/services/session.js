'use strict';

angular.module('breminaleApp')
.factory('session', function ($rootScope,$cookieStore,socket) {

	function _update(val){
		angular.copy(val.session,$rootScope.session);
		if(val.session.sessionid!=$cookieStore.get('sessionid')){
			if($cookieStore.get('sessionid')){
				$cookieStore.remove('sessionid');
			}
			$cookieStore.put('sessionid',val.session.sessionid);
		}
	}

	if(typeof $rootScope.session == 'undefined')
		$rootScope.session = {login:false};

	socket.emit('api::session::start',$cookieStore.get('sessionid'),function(result){
		_update(result);
	});

	return {update:_update};
});
