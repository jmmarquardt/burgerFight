var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    app        = express(),
<<<<<<< 044f10c0dbdbe2b0a1571a03bdf1e14b3f17e05b
    // stormpath  = require("express-stormpath"),
    dbRoutes  = require("./routing/db.routes.js");
=======
    stormpath  = require("express-stormpath"),
    Router     = express.Router();
>>>>>>> stormpath done

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
