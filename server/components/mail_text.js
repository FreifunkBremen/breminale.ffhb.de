var config = require('../config/environment'),
	text = {
		'signup_active':{
			'de' :{
				subject:'Konto aktivieren',
				html : 'Bitte aktiviert sie unter <a href"{{DOMAIN}}/active">{{DOMAIN}}/active</a> ihr Konto'+
					'mit den Code: {{code}} und ihrer E-Mail-Adresse, <br/>'+
					'oder gleich mit den folgenden Link: <br/>'+
					'<a href="{{DOMAIN}}/active/{{mail}}/{{code}}">{{DOMAIN}}/active/{{mail}}/{{code}}</a>',
				text :  'Bitte aktiviert sie unter {{DOMAIN}}/active ihr Konto'+
					'mit den Code: {{code}} und ihrer E-Mail-Adresse, \n'+
					'oder gleich mit den folgenden Link: \n'+
					'{{DOMAIN}}/active/{{mail}}/{{code}}',
			}
		}
	};

function _replace(id,type,attr,lng){
	if(typeof(lng)==='undefined')
		lng = config.mail.language;
	var go = text[id][lng][type];
	return go.replace(new RegExp('{{(.+?)}}','g'),function(x){
		return attr[x.replace('{{','').replace('}}','')];
	});
}

module.exports = function(option,id,attr,lng){
	attr.DOMAIN = config.DOMAIN;
	option.subject = _replace(id,'subject',attr,lng);
	option.html = _replace(id,'html',attr,lng);
	option.text = _replace(id,'text',attr,lng);
	return option;
};
