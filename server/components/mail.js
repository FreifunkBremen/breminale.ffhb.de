var	nodemailer = require("nodemailer"),
		config = require('../config/environment').mail;
var transport;

if(config.dev){
	var pickupTransport = require('nodemailer-pickup-transport');
	transport = nodemailer.createTransport(pickupTransport(config.transport));
}else{
	if(config.transport.own){
		transport = nodemailer.createTransport(config.transport.own);
	}else{
		var smtpTransport = require('nodemailer-smtp-transport');
		transport = nodemailer.createTransport(smtpTransport(config.smtp));
	}
}

function _sendMail(option,callback){
	option.from = config.from;
	option.subject = config.subject+option.subject;
	transport.sendMail(option,callback);
}


module.exports = {sendMail:_sendMail};
