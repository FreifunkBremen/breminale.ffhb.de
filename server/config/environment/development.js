'use strict';

// Development specific configuration
// ==================================
module.exports = {
	DOMAIN:'http://localhost:9000',
	// MySQL connection options
	database: {
		db:    process.env.MongoDB ||
						'breminale'
	},
	mail: {
		subject: '[breminale] ',
		from: 'breminale<breminale@fireorbit.de>',
		language:'de',
		transport:{directory:'/tmp'},
		dev:true
	}
};
