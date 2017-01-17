var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: {
    type: String,
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  size: {
  	type: Number
  }
});

var Comment = mongoose.model("Comments", CommentSchema);

module.exports = Comment;