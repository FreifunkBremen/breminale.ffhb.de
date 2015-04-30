var things = require('./api/things');
var session = require('./api/session');
var main = require('./api/main');
var notification = require('./api/notification');

module.exports = function(socket) {
	var cSession = session(socket);
	main(socket,cSession);
	notification(socket,cSession);
	things(socket);
};
