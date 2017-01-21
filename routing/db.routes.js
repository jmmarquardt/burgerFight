var mongoose = require("mongoose"),
	Comments = require("../models/Comments.js"),
	express  = require("express"),
	stormpath = require("express-stormpath"),
	Router   = express.Router();

var options = {
    root:__dirname + "/../views/"
};

// db goutes
Router.post("/postDB", function (req, res) {
	console.log("got here: ", req.body);
	var sizes = [40, 80, 60, 30, 20, 30, 40, 50, 60, 80, 100],
		doc = {
			comment: req.body.comment,
			size: sizes[Math.round(Math.random() * 11)]
		},
		newComment = new Comments(doc);

	newComment.save(function (err, data) {
		console.log("data: ", data);
	});
	res.redirect("comments.html", options);
});

Router.get("/getDB", function (req, res) {
	console.log("got to GET!");
	Comments.find({})
	.exec(function(err, comments) {
		res.json(comments);
	});
});

// page and login routes
Router.get("/", function (req, res) {
	res.redirect("/login");
});

Router.get("/landing", function (req, res) {
	res.sendFile("landing.html", options);
});

Router.get("/game", function (req, res) {
	res.sendFile("index.html", options);
});

Router.get("/comments", function (req, res) {
	res.sendFile("comments.html", options);
})

module.exports = Router;
