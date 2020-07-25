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

/** @function createUser
 * An endpoint for creating a new user.  The request
 * should have an object as its body parameter with 
 * username, password, and passwordConfirmation set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createUser(req, res) {
  
  //var infos = db.prepare(fs.readFileSync(querypath, 'utf8')).get(id);
  
  // TODO: Create the user
  //var username = req.body.username;
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var organization = req.body.organization;
  var email = req.body.email;
  var role = req.body.role;
  var password = req.body.password;
  var passwordConfirmation = req.body.passwordConfirmation;
  
  
  if(password !== passwordConfirmation) return failure(req, res, "Your password and password confirmation must match.");
  //var existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  
  console.log(role);
  //console.log(password);
  
  var existingUser = db.prepare(fs.readFileSync(querypathEmail, 'utf8')).get(email);
  
  console.log(existingUser);
  
  if(existingUser) return failure(req, res, `The email "${email}" is already taken.`);
  
  const passes = 10;
  bcrypt.hash(password, passes, (err, hash) => {
    console.log("MADE IT");
    if(err) return serveError(req, res, 500, err);
    // TODO: Save user to the database
    //var info = db.prepare("INSERT INTO users (username, cryptedPassword) VALUES (?, ?);").run(username, hash);
    var info = db.prepare(fs.readFileSync(querypath, 'utf8')).run(firstName, lastName, organization, role, email, hash);

    
    if(info.changes === 1) success(req, res, email);
    else failure(req, res, "An error occurred.  Please try again.");
  });
}

/** @function success 
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userID - the id of the user in the database
 */
function success(req, res, userID) {
  // Retrieve the user 
  var user = db.prepare(fs.readFileSync(querypathEmail, 'utf8')).get(userID);
  // Create session
  sessions.create(user);
  // Set session cookie
  res.setHeader("Set-Cookie", `SID=${sid}; Secure; HTTPOnly`);
  // Redirect to home page
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}


/** @function failure 
 * A helper method invoked when user creation fails.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signup.html"]({
    errorMessage: errorMessage
  });
  var html = templates["sign-layout.html"]({
    title: "Sign In",
    post: form,
    list: ""
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}


module.exports = createUser;