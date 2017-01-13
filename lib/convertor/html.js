var fs = require('fs');
var step = require('step');
var path = require('path');
var catchError = require('../catch-error');

var stringifyHTML = function(str) {
    return JSON.stringify(str)
};

module.exports = function(inputFile, callback) {
	var currentCatchError = catchError(callback);

    var basename = path.basename(inputFile, '.html');
    var outputFile = path.join(path.dirname(inputFile), basename + '.js');

	step(
		function() {
    		fs.readFile(inputFile, 'utf8', this);
		},
		currentCatchError(function(str) {
			fs.writeFile(
	            outputFile, 
	            'define(function(require){return ' + stringifyHTML(str) + '});',
	            'utf8',
	            this
	        );
		}),
		callback
	);
}