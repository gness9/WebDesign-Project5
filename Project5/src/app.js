const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const serveStandards = require('./serve-standards');
//const handleRequest = require('./handle-request');
const createPost = require('./endpoints/create-post');
const newPost = require('./endpoints/new-post');
const newTopicPost = require('./endpoints/new-topic-post.js');
const showPost = require('./endpoints/show-post');
const showTopic = require('./endpoints/show-topic');
const loadBody = require('./middleware/load-body');
//const serveError = require('./serve-error');
//const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user.js');
const createUser = require('./endpoints/create-user');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const loadSession = require('./middleware/loadSession');
//const authorsOnly = require('./middleware/authors-only');
const destroySession = require('./endpoints/destroy-session');

/** @module app 
 * The express application for our site
 */
var app = express();

app.use(loadSession);
//console.log("EH");
app.get('/', serveHomepage);

app.get('/standards', serveStandards);
app.get('/standards.html', serveStandards);

//forum/topics
app.get('/forum/topics/new', newPost);
//app.post('/posts', loadBody, createPost);
//app.get('/posts/:id', showTopic);
app.post('/forum/topics', loadBody, createPost);
app.get('/forum/topics/:id', showTopic);
//app.get('/posts/new', authorsOnly, newPost);
//app.get('/posts/topics/:id/posts', newPost);
//app.post('/posts', authorsOnly, loadBody, createPost);
//app.get('/posts/:id', showPost);
app.get("/signup", newUser);
app.post("/signup", loadBody, createUser);
app.get('/signin', newSession);
app.post("/signin", loadBody, createSession);
app.get("/signout", destroySession);


//This line allows app to display public files including site.css and site.js
app.use(express.static('public'));
//app.use(express.static('public'));

module.exports = app;