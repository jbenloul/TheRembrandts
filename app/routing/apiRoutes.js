var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

var friends = require("../data/friends");

module.exports = function(app) {

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
    var index = compareFriends(friends, parseInt(req.body.scoreTotal));
    friends.push(body);
    return res.json(friends[index]);
    console.log(friends);
}); 

}



