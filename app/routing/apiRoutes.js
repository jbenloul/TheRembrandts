var express = require('express');
var app = express();

var mysql = require("mysql");

var port = 8000;

//data from the mysql

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "something",
    database: "friends_db"
});
 

app.get('/', function (request, response) {

res.send("FRIEND FINDER!");
})

app.get('/api/:friends?'){
	var selected = request.params.friends;

	if (selected){
		console.log(selected);

		for (var i = 0; i < friends_db.length; i++) {
			if (newFriend[i].name === selected){
				return request.json(newFriend[i]);
			}
		}

		return request.send("This isn't a valid friend");

	}
	return res.json(newFriend)
}

app.listen(port, function() {
  console.log("App listening on port " + PORT);
});
