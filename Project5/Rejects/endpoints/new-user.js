//Endpoint that will process the submitted form for signup
const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["signup.html"]({
    errorMessage: ""
  });
  var html = templates["layout.html"]({
    post: form, 
    list: "", 
    title: "New Post",
    user: req.session && req.session.user
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}