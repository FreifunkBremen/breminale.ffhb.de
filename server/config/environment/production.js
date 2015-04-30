'use strict';

// Production specific configuration
// =================================
module.exports = {
	DOMAIN:'http://localhost:9000',
	// Server IP
	ip:       process.env.IP ||
						undefined,

	// Server port
	port:     process.env.PORT ||
						8080,

	// MySQL connection options
	database: {
		db:    process.env.MongoDB ||
						'breminale'
	},
	mail: {
		subject: '[breminale] ',
		from: 'breminale<breminale@fireorbit.de>',
		transport:{debug:true,own:false},
		dev:false,
		smtp:{
			host: 'localhost',
			port: 587,
			secure: false,
			ignoreTLS: false,
			tls:{
				rejectUnauthorized: false
			},
			auth: {
				user: 'breminale@fireorbit.de',
				pass: 'breminalePassword'
			}
		}
	}
};
