var mongoose = require("mongoose"),
	Comments = require("../models/Comments.js"),
	express  = require("express"),
	Router   = express.Router();

Router.post("/postDB", function (req, res) {
	var sizes = [10, 15, 15, 15, 20, 30, 40, 50, 60, 80, 100],
		doc = {
			comment: req.body.comment,
			size: sizes[Math.round(Math.random() * 11)]
		},
		newComment = new Comments(doc);

	newComment.save(function (err, data) {
		console.log("data: ", data);
	});
});

Router.get("/getDB", function (req, res) {
	console.log("got to GET!");
	Comments.find({})
	.exec(function(err, comments) {
		res.json(comments);
	});
});

module.exports = Router;