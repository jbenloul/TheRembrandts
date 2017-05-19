var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var friends = [];


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});
 

 app.get("/api/:friendName?", function (req, response){
	var res = req.params.friend;

	if(res){
		console.log(res);
		let size = res.length;
		for(var i = 0; i < size; i++){
			if(res === friends[i].name){
				return response.json(friends[i]);
			}
		}
		return response.json(false);
	}
	return response.json(friends);
});


app.post("/api/new", function(req, res){
	var newFriend = req.body;
	newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();

	console.log(newFriend);

	friends.push(newFriend);

	response.json(newFriend);
});


app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});
