var http = require('http');
var routes = require('./lib/routes');
var server = http.createServer(routes);
server.listen(3000);
server.on('error',function(e) {
	console.log(e);
});