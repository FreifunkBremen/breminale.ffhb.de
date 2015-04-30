var uuid = require('node-uuid');
var crypto = require('crypto');

var mongoose = require('mongoose');
var Login = mongoose.model('Login');



var session = [];




function password_check(hash,clr,callback){
	var split=hash.split('$');
	_password_hash(split[2],clr,function(result){
		callback(result==hash);
 });
};

function _password_hash(salt,clr,callback){
	crypto.pbkdf2(clr,salt,10000,20,function(err,hashPass){
		if(err)
			return callback(false);
		callback('pbkdf2_sha1$10000$'+ salt+"$"+(new Buffer(hashPass,'utf8')).toString('base64'));
	});
};

function password_create(password,callback){
	_password_hash(crypto.randomBytes(8).toString('base64'),password,function(result){
		callback(result);
	});
};


module.exports = function(socket) {
	var id;

	function init(val){
		if(typeof session[val] === 'undefined'){
			id=uuid.v4();
			session[id]={data:{login:false,sessionid:id},id:id};
		}else
			id=val;
		console.log(id);
	}


	socket.on('api::session::start',function(val,callback){
		init(val);
		callback(_request({s:true}));
	});

	socket.on('api::session::login',function(val,callback){
		init(id);
		Login.findOne({username: val.username}, function(err,login) {
			if(!err && login){
				password_check(login.password,val.password,function(result){
					if(result){
						session[id].data.login = true;
						session[id].data.name = login.name;
						callback(_request({s:true}));
					}else{
						callback(_request({s:false,form:{field:{'password':true}}}));
					}
				});
			}else
				callback(_request({s:false,form:{field:{'username':true}}}));
		});
	});

	socket.on('api::session::logout',function(callback){
		init(id);
		session[id].data.login = false;
		callback(_request({s:true}));
		delete session[id];
	});

	function _request(data,callback){
		data.session=session[id].data;
		if(typeof callback === 'function')
			callback(data);
		return data;
	}
	function _set(key,value){
		session[id].data[key]=value;
	};
	return {request:_request,
	set:_set};
};
