const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["signup.html"]({
    errorMessage: ""
  });
  var html = templates["sign-layout.html"]({
    title: "Sign Up",
    post: form,
    list: ""
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}