const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["signin.html"]({
    errorMessage: ""
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