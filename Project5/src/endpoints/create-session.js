const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');
const sessions = require('../sessions');
const fs = require('fs');
const path = require('path');


var querypath = '././queries/create-user.sql';
var querypathEmail = '././queries/select-user-by-email.sql';
var querypathother = '././queries/get-all-posts-for-topic.sql';
var querypathTwo = '././queries/create-forum-topic.sql';
var querypathStandard = '././queries/get-standard-by-id.sql';
var querypathUser = '././queries/get-all-users.sql';

/** @function createSession
 * A helper method invoked when session creation is
 * successful.  The request should have an object
 * as its body parameter with username and password set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createSession(req, res) {
  // TODO: Create the session
  var email = req.body.email;
  var password = req.body.password;
  //var user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  
  //console.log(email);
  //console.log(password);
  
  
  //var users = db.prepare(fs.readFileSync(querypathUser, 'utf8')).all();
  var user = db.prepare(fs.readFileSync(querypathEmail, 'utf8')).get(email);
  
  //console.log(users);
  //console.log("BREAK");
  //console.log(user.crypted_password);
  //console.log(password);
  
  if(!user) return failure(req, res, "Usename/Password not found.  Please try again.");
  bcrypt.compare(password, user.crypted_password, (err, result) => {
    //console.log(result);
    if(err) return serveError(req, res, 500, err);
    if(result) success(req, res, user);
    else return failure(req, res, "Username/Password not found. Please try again.");
  });
}

module.exports = createSession;


/** @function success
 * Helper function for creating the user session after 
 * a successful login attempt.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {object} user - the user who signed in
 */
function success(req, res, user) {
  
  //console.log(user);
  //res.end(`Welcome ${user.email}.  You logged in successfully!`);
  var sid = sessions.create(user);
  
  //console.log("MADE IT BACK");
  //console.log(sid);
  //console.log("THAT WAS SID");
  
  res.setHeader("Set-Cookie", `SID=${sid}; Secure; HTTPOnly`);
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

/** @function failure 
 * A helper function for reporting issues logging a 
 * user in.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - the error message for the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signin.html"]({
    errorMessage: errorMessage
  });
  var html = templates["sign-layout.html"]({
    title: "Sign In",
    post: form,
    list: "",
    user: req.session && req.session.user
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}