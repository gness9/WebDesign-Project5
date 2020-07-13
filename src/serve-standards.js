const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');
const pathToMimeType = require('./path-to-mime-type');
const ejs = require('ejs');

/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function serveStandards(req, res) {
  
  var pathname = new URL(req.url, "http://localhost").pathname;
  var filePath = path.join('public', pathname);
  
  var data = {
      pathname: pathname
  };
  
  
  var file = fs.readFileSync("templates/standards.html", {encoding: "utf8"});
  
  var html = ejs.render(file, data);
  
  //console.log(file);
      //ejs.render("templates/standards.html", data);
  
  //console.log(html);
  
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
  /*res.writeHeader(200, {
        "Content-Type": "text/html",
        "Content-Length": html.length
      }).end(html);*/
  
  

}

module.exports = serveStandards;