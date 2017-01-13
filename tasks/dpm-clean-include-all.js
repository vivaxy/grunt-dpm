var path = require('path');

module.exports = function(grunt) {
	 grunt.registerMultiTask('dpm-clean-include-all', 'Clean auto generated include all', function() {
        this.filesSrc.forEach(function(filePath) {
            grunt.file.write(filePath, 'define(function(require){});');
        });
    })
}