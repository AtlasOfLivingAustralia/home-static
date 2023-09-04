var static = require('node-static'),
    http = require('http'),
    addressCORS = "*",
    port = 8081;

/**
 * Files in build directory can be accessed from this server.
 * Example http://localhost:8081/css/jquery-ui.css
 *
 * Run server using the command -
 * node server.js
 */

var file = new(static.Server)('./', {cache: false, headers: {
        "Access-Control-Allow-Origin": addressCORS,
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
}});
http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(port);

console.log(`Starting server on http://localhost:${port}`)
