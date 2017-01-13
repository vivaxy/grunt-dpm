var path = require('path');
var staticServer = require('../lib/static-server');
var fork = require('child_process').fork;

module.exports = function(grunt) {
	grunt.registerMultiTask('dpm-server', 'Start a static web server in project root', function() {
	 	var dir = path.resolve('./');
	 	var options = this.options({
	 		port: 3000
	 	});

	 	staticServer(dir, options.port);
 	    
        grunt.log.write('Server start on ' + ('localhost:'  + options.port + '').green);

        this.async();
    })
}