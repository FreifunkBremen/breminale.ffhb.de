'use strict';

// Test specific configuration
// ===========================
module.exports = {
	DOMAIN:'http://localhost:9000',
	// MySQL connection options
	database: {
		db:    process.env.MongoDB||
						'breminale'
	},
	mail: {
		subject: '[breminale] ',
		from: 'breminale<breminale@fireorbit.de>',
		language:'de',
		transport:{debug:true},
		dev:true
	}
};
