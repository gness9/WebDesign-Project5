//const db = require('./database');
const templates = require('../templates');

/** @function homepage
 * Serves the home page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveHomepage(req, res) {
  //console.log("HELLO");
  // Get the newest post in the database
  //var newestPost = db.prepare("SELECT * FROM posts ORDER BY date DESC LIMIT 1").get();
  // Generate the post HTML
  
  //console.log(req.session);
  //console.log(req.session.user.role);
  
  var data = {
      //newestPost: newestPost
      user: req.session.user
  };
  
  var html = templates['layout.html'](data);
  // Serve the HTML
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;