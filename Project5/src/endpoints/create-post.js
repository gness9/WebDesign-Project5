const db = require('../database');
const fs = require('fs');
const path = require('path');

var querypath = '././queries/get-all-forum-topics.sql';
var querypathother = '././queries/get-all-posts-for-topic.sql';
var querypathTwo = '././queries/create-forum-topic.sql';
var querypathStandard = '././queries/get-standard-by-id.sql';

/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createPost(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var date = new Date().valueOf();
  
  // Publish the post to the database
  //var sql = fs.readFileSync('queries/get-all-standards.sql').toString();
  
  
  //var queries = db.prepare(fs.readFileSync(querypath, 'utf8')).all();
  //var query = db.prepare(fs.readFileSync(querypathother, 'utf8')).all(1);
  //var querytwo = db.prepare(fs.readFileSync(querypathStandard, 'utf8')).all(1);
  //var queriess = db.prepare(fs.readFileSync(querypathTwo, 'utf8')).run();
  //console.log(queries.id);
  //console.log(query);
  //console.log(querytwo);
  //console.log(queriess);
  
  //INSERT INTO forum_topics (subject, user_id) VALUES (?, ?);
  var info = db.prepare(fs.readFileSync(querypathTwo, 'utf8')).run('HELLO', 1);
  
  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  
  console.log(info);
  // Redirect to the read page for the post
  res.writeHead(302, {"Location": `posts/${info.lastInsertRowid}`}).end();
}

module.exports = createPost;