module.exports = function(socket,session) {
	socket.on('notification::active::set',function(value,callback){
		session.set('notify',value);
		callback(session.request({s:true}));
	});
	socket.on('notification::all',function(callback){
		callback(session.request({s:true,items:[
			{type:'weather',title:'Test',subtitle:'kein Unwetter',text:'Es geht weiter',label:['one','two'],image:'http://upload.wikimedia.org/wikipedia/commons/2/24/Light_Rain_Showers.png'},
		]}));
	});

	socket.on('notification::push',function(callback){
		socket.broadcast.emit('notification::push',{
			type:'weather',
			title:'Test',
			subtitle:'kein Unwetter',
			text:'Es geht weiter',
			label:['one','two'],
			image:'http://upload.wikimedia.org/wikipedia/commons/2/24/Light_Rain_Showers.png'}
		);
		callback(session.request({s:true}));
	});
};
