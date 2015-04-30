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
	}
};
