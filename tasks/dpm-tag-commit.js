var path = require('path');
var cp = require('child_process')


module.exports = function(grunt) {
	 grunt.registerTask('dpm-tag-commit', 'run git tag x.x.x', function() {
	 	cp.exec('git tag ' + grunt.config('pkg.version'));
    })
}