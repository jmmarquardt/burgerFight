var express    = require("express"),
    bodyParser = require("body-parser"),
    app        = express(),
    stormpath  = require("express-stormpath"),
    Router     = express.Router();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));
// start stormpath and set future routing
app.use(stormpath.init(app, {
  application: {
    href: process.env.STORMPATH_APPLICATION_HREF
  },
  website: true,
  web: {
    login: {
      nextUri: '/'
    }
  }
}));

app.on('stormpath.ready', function() {
  console.log("Stormpath Ready.");
	app.listen(process.env.PORT || PORT, function () {
		console.log("Listening on port ", PORT);
	});
});
