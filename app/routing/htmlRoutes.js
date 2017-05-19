var fs = require('fs');
var url = require('url');
var http = require('http');

var port = 8000;
var server = http.createServer(pageRequest);

server.listen(port, function() {
	console.log("Server listening on: http://localhost:%s", port);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});
 