var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');


module.exports = function(socket,session) {
	socket.on('notification::active::set',function(value,callback){
		session.set('notify',value);
		callback(session.request({s:true}));
	});
	socket.on('notification::all',function(callback){
		Notification.find(function(err,result){
			if(!err)
				callback(session.request({s:true,items:result}));
			else
				callback(session.request({s:false}));
		});
	});

	socket.on('notification::push',function(callback){
		var msg = new Notification({
			type:'weather',
			title:'Test',
			subtitle:'kein Unwetter',
			text:'Es geht weiter',
			label:['one','two'],
			image:'http://upload.wikimedia.org/wikipedia/commons/2/24/Light_Rain_Showers.png'}
		);
		msg.save();
		socket.broadcast.emit('notification::push',msg);
		callback(session.request({s:true}));
	});
};
