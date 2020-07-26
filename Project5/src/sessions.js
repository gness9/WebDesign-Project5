const bcrypt = require('bcrypt');
const templates = require('./templates');
const serveError = require('./serve-error');
const fs = require('fs');
const path = require('path');


var querypath = '././queries/create-user.sql';
var querypathEmail = '././queries/select-user-by-email.sql';
var querypathother = '././queries/get-all-posts-for-topic.sql';
var querypathTwo = '././queries/create-forum-topic.sql';
var querypathStandard = '././queries/get-standard-by-id.sql';
var querypathUser = '././queries/get-all-users.sql';


var sessions = {};


const {v1: uuidv1} = require('uuid');
const db = require('./database');

// Sessions expire after 3 minutes of inactivity
const SESSION_MAX_DURATION = 3 * 60 * 1000; 

// Expired sessions are cleared every hour
const SESSION_EXPIRATION_INTERVAL = 60 * 60 * 1000;

/** @function generateUUID
 * This function generates a new UUID, ensuring it isn't already in use
 * @returns {string} A UUID not already in use
 */
function generateUUID() {
  var uuid = uuidv1();
  // Invariant: The current value of uuid is already in use 
  while(sessions[uuid]) {uuid = uuidv1()}
  return uuid;
}

/** @function createSession 
 * Creates a new user session for the supplied user, 
 * and returns the session id
 * @param {object} user - the user object
 * @returns {string} The session id
 */
function createSession(user) {
  //console.log("MADE IT TO CREATE SESSION");
  var sid = generateUUID();
  var role = db.prepare(fs.readFileSync(querypathEmail, 'utf8')).get(user.email);
  //var role = db.prepare("SELECT name FROM roles WHERE id = ?").get(user.role_id).name;
  
  //console.log(role.email);
  //console.log(role.id);
  
  sessions[sid] = {
    timestamp: Date.now(),
    user: {
      id: role.id,
      username: role.email,
      role: role
    },
    data: {}
  }
  return sid;
}

/** @function isSessionExpired
 * Checks to see if the function has expired
 * @param {string} sid - the session identifier 
 * @returns {boolean} true if the session is expired or nonexistent, false if not
 */
function isSessionExpired(sid) {
  if(!sessions[sid]) return true;
  // If the time elapsed from session udpate to now is greater
  // than our maximum session length, the session is expired
  var expired = Date.now() - sessions[sid].timestamp > SESSION_MAX_DURATION;
  if(expired) {
    // If the session is expired, delete it to conserve memory
    delete sessions[sid];
    return true;
  } else {
    return false;
  }
}

/** @function expireSessions 
 * Iterates through all in-memory sessions and deletes any that are expired
 */
function expireSessions() {
  // iterate over all properties in the sessions object
  for(var sid in sessions) {
    // as a side effect, expires sessions are cleared from memory
    isSessionExpired(sid); 
  }
  /*var i;
  for(i = 0; i < sessions.length; i++)
    {
      isSessionExpired(sessions[i]);
    }*/
}

// Expire the sessions at the specified interval
setInterval(expireSessions, SESSION_EXPIRATION_INTERVAL);

/** @function getSession 
 * Returns the session corresponding to the sid 
 * if it exists and is not expired.  Also resets 
 * the expiration timer
 * @param {string} sid - the session identifier
 * @returns {object || null} the session, or null if it does not exist
 */
function getSession(sid) {
  if(sessions[sid] && !isSessionExpired(sid)) {
    sessions[sid].timestamp = Date.now();
    return JSON.parse(JSON.stringify(sessions[sid]));
  } else {
    return false;
  }
}

/** @function updateSession
 * Updates the session using the provided data
 * @param {string} sid - the session identifier
 * @param {object} data - the session data 
 * @returns {boolean} true if the session was updated successfully
 */
function updateSession(sid, data) {
  if(sessions[sid] && !isSessionExpired(sid)) {
    sessions[sid].timestamp = Date.now();
    sessions[sid].data = data;
    return true;
  } else {
    return false;
  }
}

/** @function removeSession
 * Removes the specified session from memory
 * @param {string} sid - the session identifier 
 */
function removeSession(sid) {
  delete sessions[sid];
}

/** @module sessions
 * A module providing access to a session store 
 */
module.exports = {
  create: createSession,
  get: getSession,
  update: updateSession,
  remove: removeSession
}