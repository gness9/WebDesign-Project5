const templates = require('../templates');

/** @function newPost 
 * Serves the form for creating a new post 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newPost(req, res) {
  
  var data = {
      user: req.session && req.session.user
  };
  
  var html = templates["new-post.html"](data);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newPost;