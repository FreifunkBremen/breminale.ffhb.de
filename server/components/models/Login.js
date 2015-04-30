var mongoose = require('mongoose');

var LoginSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  name: String,
  password: String,
	type:{ type: String, enum: ['admin','ffhb','mgmt','moderator'] }
});

mongoose.model('Login', LoginSchema);
