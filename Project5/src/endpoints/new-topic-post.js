const templates = require('../templates');

/** @function newPost 
 * Serves the form for creating a new post for a specific topic
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newPost(req, res) {
  var html = templates["new-topic-post.html"]();
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newPost;