const db = require('../database');
const fs = require('fs');
const path = require('path');
const serveError = require('../serve-error');

var querypath = '././queries/get-all-forum-topics.sql';
var querypathother = '././queries/get-all-posts-for-topic.sql';
var querypathTwo = '././queries/create-forum-topic.sql';
var querypathPost = '././queries/create-forum-post.sql';
var querypathStandard = '././queries/get-standard-by-id.sql';

/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createPost(req, res) {
  var body = req.body.subject;
  //var content = req.body.content;
  var date = new Date().valueOf();
  
  const forum_topic_id = parseInt(req.params.id, 10);
  
  //console.log("MADE IT");
  //console.log(req.session.user);
  
  if(req.session.user == undefined)
    {
      return serveError(req, res, 500, "Unable to write to database");
    }
  else
    {
      var user_id = req.session.user.id;
    }
  
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
  
  //console.log(body);
  //console.log(user_id);
  //console.log(forum_topic_id);
  //console.log(id);
  
  //INSERT INTO forum_posts (body, forum_topic_id, user_id) VALUES (?,?,?);
  var info = db.prepare(fs.readFileSync(querypathPost, 'utf8')).run(body, forum_topic_id, user_id);
  
  // Determine if the write succeeded
  if(info.changes != 1) return serveError(req, res, 500, "Unable to write to database");

  
  console.log(info);
  // Redirect to the read page for the post
  res.writeHead(302, {"Location": `${forum_topic_id}`});
  res.end();
}

module.exports = createPost;