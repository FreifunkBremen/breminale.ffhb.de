module.exports = function(socket,session) {
	socket.on('main::ping',function(callback){
		callback(session.request({s:true}));
	});
};
