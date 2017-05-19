var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var friends = [{
    name: "Josh",
    picture: "ksjdfkjfn.com",
    scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    scoreTotal: 10
}, {
    name: "Josh2",
    picture: "ksjdfkjfn.com",
    scores: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    scoreTotal: 20
}, {
    name: "Josh3",
    picture: "ksjdfkjfn.com",
    scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    scoreTotal: 30
}, {
    name: "Josh4",
    picture: "ksjdfkjfn.com",
    scores: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    scoreTotal: 40
}];



function compareFriends(arr, num) {
    var currentDist = 41;
    var ind = 0
    for (var i = 0; i < arr.length; i++) {
        if (Math.abs(arr[i].scoreTotal) - Math.abs(num) < currentDist) {
            currentDist = Math.abs(arr[i].scoreTotal) - Math.abs(num);
            ind = i;
        }
    }
    return ind;
}

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

//this works!
app.get("/api/:friendName?", function(req, res) {
    var friendName = req.params.friendName;
    console.log(friendName);

    if (friendName) {
        for (var i = 0; i < friends.length; i++) {
            if (friendName === friends[i].name) {
                console.log("another", friendName);
                return res.json(friends[i]);
            }
        }
        return res.json(false);
    }
    return res.json(friends);
});

app.post("/api/friend", function(req, res) {
    var body = req.body;
    body.name = body.name.replace(/\s+/g, "").toLowerCase();
    var index = compareFriends(friends, parseInt(req.body.scoreTotal));
    friends.push(body);
    return res.json(friends[index]);
    console.log(friends);
}); 


app.listen(port, function() {
    console.log("App listening on port " + port);
});
