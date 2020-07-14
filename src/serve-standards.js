const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');
const pathToMimeType = require('./path-to-mime-type');
const ejs = require('ejs');
const db = require('./database');
const templates = require('./templates');

var querypath = '././queries/get-all-standards.sql';
var querypathTwo = '././queries/get-standard-by-id.sql';

/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function serveStandards(req, res) {
  
  //'SELECT standards.identifier AS identifier, standards.description AS description, standards.summary AS summary, concepts.name AS concept, concepts.abbr AS conceptAbbr, subconcepts.name AS subconcept, subconcepts.abbr AS subconceptAbbr, grade_levels.name AS gradeLevel, grade_levels.abbr AS gradeLevelAbbr, (  SELECT group_concat(practices.id || '. ' || practices.name, ', ') FROM practices INNER JOIN standards_practices ON practices.id = standards_practices.practice_id WHERE standards_practices.standard_id = standards.id) AS practicesFROM standards INNER JOIN concepts on standards.concept_id = concepts.idINNER JOIN subconcepts on standards.subconcept_id = subconcepts.id INNER JOIN grade_levels on standards.grade_level_id = grade_levels.id;'
  
  var pathname = new URL(req.url, "http://localhost").pathname;
  
  
  //db.prepare('SELECT * FROM posts;').all();
  //var newestPost = db.prepare("SELECT * FROM posts ORDER BY date DESC LIMIT 1").get();
  var sql = fs.readFileSync('queries/get-all-standards.sql').toString();
  
  
  var queries = db.prepare(fs.readFileSync(querypath, 'utf8')).all();
  //console.log(sql);
  //var ad = new Database('queries/create-database.sql');
  //var newestPost = db.prepare(sql).get(1);
  
  //console.log(queryR);
  var identifier = [];
  var statement = [];
  var description = [];
  var concept = [];
  var subconcept = [];
  var practices = [];
  
  var num;
  for (num = 0; num < queries.length; num++) {
    identifier[num] = queries[num].identifier;
    statement[num] = queries[num].statement;
    description[num] = queries[num].description;
    concept[num] = queries[num].concept;
    subconcept[num] = queries[num].subconcept;
    practices[num] = queries[num].practices;
  }
  
  var filePath = path.join('public', pathname);
  
  var data = {
      pathname: pathname,
      queries: queries,
      //tests: tests,
      identifier: identifier,
      statement: statement,
      description: description,
      concept: concept,
      subconcept: subconcept,
      practices: practices
      //newestPost: newestPost
  };
  
  
  var html = templates['standards'](data);
  
  //var file = fs.readFileSync("templates/standards.ejs", {encoding: "utf8"});
  
  //var html = ejs.render(file, data);
  
  //console.log(file);
      //ejs.render("templates/standards.html", data);
  
  //console.log(html);
  
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
  /*res.writeHeader(200, {
        "Content-Type": "text/html",
        "Content-Length": html.length
      }).end(html);*/
  
  

}

module.exports = serveStandards;