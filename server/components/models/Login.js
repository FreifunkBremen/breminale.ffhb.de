var mongoose = require('mongoose');

var LoginSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  active: {type: Boolean, default: false},
	lastloginAt:Date,
	code:String
});

mongoose.model('Login', LoginSchema);
