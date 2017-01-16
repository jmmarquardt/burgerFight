var express    = require("express"),
    bodyParser = require("body-parser"),
    app        = express(),
    // stormpath  = require("express-stormpath"),
    Router     = express.Router();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));
// app.use(stormpath.init(app, {
  // website: true
// }));

// app.on('stormpath.ready', function() {
	app.listen(process.env.PORT || PORT, function () {
		console.log("Listening on port ", PORT);
	});
// });
