var things = require('./api/things');
var session = require('./api/session');

module.exports = function(socket) {
	session(socket);
	things(socket);
};
