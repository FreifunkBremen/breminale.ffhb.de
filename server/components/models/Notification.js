var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
	type:{ type: String, enum: ['weather','events','changes','other'] },
	title: String,
	subtitle: String,
	text:String
});

mongoose.model('Notification', NotificationSchema);
