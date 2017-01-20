var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express(),
    dbRoutes    = require("./routing/db.routes.js")
    stormpath   = require("express-stormpath"),
    Router      = express.Router(),
    PORT        = process.env.PORT || 3000;

// mongo db middleware
mongoose.connect("mongodb://localhost/LOR:TB");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// express
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
      nextUri: '/landing'
    },
    logout: {
      enabled: true,
      nextUri: '/login'
    }
  }
}));

app.on('stormpath.ready', function() {
  console.log("Stormpath Ready.");
	app.listen(process.env.PORT || PORT, function () {
		console.log("Listening on port ", PORT);
	});
});
