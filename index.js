'use strict';

const joi = require('joi');

module.exports = function (schemas, options) {
	options = options || {};
	return function*(next) {
		try{
			for(let key in schemas) {
				yield (function() {
					return function(cb) {
						joi.validate(this.request[key], schemas[key], options, cb);
					};
				})();
			}
		} catch(err) {
			err.status = 400;
			throw err;
		}
		
	};
};
