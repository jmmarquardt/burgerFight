var express    = require("express"),
    bodyParser = require("body-parser"),
    Router     = express.Router();

var app  = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));

app.listen(PORT, function () {
	console.log("Listening on port ", PORT);
});