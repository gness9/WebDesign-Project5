const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');
const serveHomepage = require('./endpoints/serve-homepage');

/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  //console.log("PLZ");
  if(req.method !== 'GET') return res.writeHead(501).end();
  //serveFile(req, res);
  var pathname = new URL(req.url, 'http://localhost').pathname;
    
  fs.stat(path.join("public", pathname), (err, stat) => {
    // TODO: Serve file or list directory
    //console.log(stat);
    if(err) { console.log(err); return res.writeHead(404).end(); }
    if(stat.isFile()) return serveFile(req, res);
    if(stat.isDirectory()) return listDirectory(req, res);
    return res.writeHead(404).end();
  });
}

/*function handleRequest(req, res) {
  //console.log("MADE IT 3");
  //res.writeHead(501).end();
  serveHomepage(req, res);
}*/

module.exports = handleRequest;