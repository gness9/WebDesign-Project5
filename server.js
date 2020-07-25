const handleRequest = require('./src/handle-request');
const http = require('http');
require('./src/database');
const port = 3000;

/*
var server = http.createServer(function(req, res) {
  res.end("Hello, Web Browser!");
});*/

var server = http.createServer(handleRequest);

server.listen(port, function(){
  console.log("Server is listening on port " + port);
  //console.log("CHECK");
});

//const pathToMimeType = require('./path-to-mime-type');