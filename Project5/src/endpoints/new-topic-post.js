const templates = require('../templates');
const db = require('../database');
const fs = require('fs');
const path = require('path');


var querypath = '././queries/get-all-forum-topics.sql';
var querypathother = '././queries/get-all-posts-for-topic.sql';
var querypathTwo = '././queries/create-forum-topic.sql';
var querypathEmail = '././queries/select-user-by-email.sql';

/** @function newPost 
 * Serves the form for creating a new post for a specific topic
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newPost(req, res) {
  
  
  //var queries = db.prepare(fs.readFileSync(querypathEmail, 'utf8')).get(req.session.user.username);
  const id = parseInt(req.params.id, 10);
  //console.log(id);
  
  var data = {
      user: req.session && req.session.user,
      id: id
      //queries: queries
  };
  
  var html = templates["new-topic-post.html"](data);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newPost;