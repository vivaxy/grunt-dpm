var _ = require('underscore');
var path = require('path');

module.exports = function(grunt) {
	grunt.registerMultiTask('dpm-create-include-all', 'Generated a file that include all files', function() {
		
		var dest = this.data.dest;

		// delete past generated file, prevent include it self
    	grunt.file.delete(dest);
		
    	grunt.file.write(dest, 
    		'define(function(require){\n    ' + this.filesSrc.map(function(src) {
				var relativePath = path.relative(path.dirname(dest), src);
				if (relativePath.indexOf('.') !== 0) {
					relativePath = './' + relativePath;
				}
	        	return 'require(\'' + relativePath.replace(/\\/g, '/') +  '\');';
			}).join('\n    ') + '\n});'
		);

    	grunt.log.writeln('File generated: ' + dest.green);
    });
}