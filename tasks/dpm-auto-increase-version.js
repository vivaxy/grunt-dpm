var path = require('path');

module.exports = function(grunt) {
  grunt.registerTask('dpm-auto-increase-version', 'Auto increase "version" in package.json', function() {
    var pkg = grunt.config('pkg');

    var versions = (pkg.version || '0.0.0').split('.');
    versions[versions.length - 1] = versions[versions.length - 1] - (-1);

    var newVersion = versions.join('.');
    pkg.version = newVersion;

    // write back new current version
    grunt.file.write('package.json', JSON.stringify(pkg, null, 4));
    // update config
    grunt.config('pkg.version', newVersion);

    grunt.log.write('current version is ' + newVersion.green);
  })
};
