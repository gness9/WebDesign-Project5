const http = require('http');
require('./src/database');
require('./src/templates');
//const handleRequest = require('./src/handle-request');

const port = 3000;

// Create the server
const app = require('./src/app');

//var server = http.createServer(handleRequest);

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});