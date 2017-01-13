var child_process = require('child_process');
var fs = require('fs');
var _ = require('underscore');
var step = require('step');
var path = require('path');

var CONVERTOR_HOME = path.join(__dirname, '../lib/convertor');

var convertors = fs.readdirSync(CONVERTOR_HOME).reduce(function(ret, file) {
	ret[path.basename(file, '.js')] = require(path.join(CONVERTOR_HOME, file));
	return ret;
}, {});

module.exports = function(grunt) {
	grunt.registerMultiTask('dpm-convert', 'Convert html > js, less > css', function() {
		var done = this.async();

		var self = this;
		
		step(
			function() {
				var group = this.group();
				self.filesSrc.forEach(function(file) {
					var extname = path.extname(file);
					if (extname) {
						extname = extname.substring(1);
						if (convertors[extname]) {
							convertors[extname](file, group());
						}
					}
				})	
			},
			function(err) {
				if (err) {
					grunt.log.error(err);
				} else {
					done();
				}
			}
		);

    });
}