var slice = [].slice;

var consoleLog = function(err) {
    console.log('error:' + require('util').inspect(err));
};

var noop = function() {};


module.exports = function(error) {
    if (!error) {
        error = consoleLog;
    }

    return function(success) {
        if (!success) {
            success = noop;
        }

        return function(err) {
            if (err) {
                error.call(this, err);
            } else {
                success.apply(this, slice.call(arguments, 1));
            }
        }
    };
};