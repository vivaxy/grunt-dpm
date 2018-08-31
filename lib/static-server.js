var connect = require('connect');
var http = require('http');

module.exports = function(dir, port) {
  var app = connect()
    .use(connect.directory(dir))
    .use(connect.static(dir));

  http.createServer(app).listen(port);
};
