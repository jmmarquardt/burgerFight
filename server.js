var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    app        = express(),
    // stormpath  = require("express-stormpath"),
    dbRoutes  = require("./routing/db.routes.js");

var PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/LOR:TB");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));
app.use(dbRoutes);
// app.use(stormpath.init(app, {
//   website: true
// }));


// app.on('stormpath.ready', function() {
	app.listen(process.env.PORT || PORT, function () {
		console.log("Listening on port ", PORT);
	});
// });
