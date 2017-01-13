var fs = require('fs');
var step = require('step');
var path = require('path');
var less = require('less');
var parser = new(less.Parser)({});

var catchError = require('../catch-error');

var parser = new(less.Parser)({});

module.exports = function(inputFile	, callback) {
	var currentCatchError = catchError(callback);

    var basename = path.basename(inputFile, '.less');
    var outputFile = path.join(path.dirname(inputFile), basename + '.css');

   	step(
		function() {
    		fs.readFile(inputFile, 'utf8', this);
		},
		currentCatchError(function(str) {
			parser.parse(str, this);
		}),
		currentCatchError(function(root) {
			fs.writeFile(
                outputFile,
                root.toCSS(),
                'utf8', 
                this
            );
		}),
		function(err) {
			if (err) {
				callback(inputFile + ' less parse error: \n' + require('util').inspect(err));
			} else {
				callback(null);
			}			
		}
   	)
}