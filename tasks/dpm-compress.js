var child_process = require('child_process');
var _ = require('underscore');
var step = require('step');

var compress = require('../lib/compress');

module.exports = function(grunt) {
  grunt.registerMultiTask('dpm-compress', 'package all included js into on file and compress it', function() {
    compress(this.data.src, this.data.baseUrl, this.data.seaConfigFile, this.async());
  });
};
