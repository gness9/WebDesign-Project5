const templates = require('../templates');
const db = require('../database');
const fs = require('fs');
const path = require('path');


var querypath = '././queries/get-all-forum-topics.sql';
var querypathother = '././queries/get-all-posts-for-topic.sql';
var querypathTwo = '././queries/create-forum-topic.sql';
var querypathStandard = '././queries/get-standard-by-id.sql';

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showPost(req, res) {
  // Determine the post ID
  const id = parseInt(req.params.id, 10);
  // Retreive the post from the database 
  //var post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
  
  var infos = db.prepare(fs.readFileSync(querypathother, 'utf8')).get(id);
  //var queries = db.prepare(fs.readFileSync(querypath, 'utf8')).all();
  //var query = db.prepare(fs.readFileSync(querypathother, 'utf8')).all(1);
  //var querytwo = db.prepare(fs.readFileSync(querypathStandard, 'utf8')).all(1);
  
  console.log(infos);
  
  var queries = db.prepare(fs.readFileSync(querypath, 'utf8')).all();
  
  queries.date = new Date(queries.date);
  
  //console.log(post);
  
  
  var subject = [];
  var creator = [];
  var postCount = [];
  var date = [];
  
  var num;
  for (num = 0; num < queries.length; num++) {
    subject[num] = queries[num].subject;
    creator[num] = queries[num].creator;
    postCount[num] = queries[num].postCount;
    date[num] = queries[num].date;
  }
  
  
  var data = {
      subject: subject,
      creator: creator,
      //tests: tests,
      postCount: postCount,
      queries: queries,
      date: date,
      infos: infos,
  };
  
  //console.log(subject);
  
  
  if(infos == undefined)
    {
      var html = templates["post.html"](data);
    }
  else
    {
      //var html = templates["post.html"](data);
      var html = templates["topic.html"](data);
    }
  // Generate the HTML
  
  // Serve the HTML
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showPost;