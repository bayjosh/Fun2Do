var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
/*
  MB:
    1. Make sure to put all your require import statements at
        the top of the file.
    2. var is not really a variable to use anymore. Try const, or let when necessary.
        We can discuss the differences between var, let, const in person.
    3. Be consistent with quote usage. I recommend the standard of single quotes within
        script files, double quotes reserved for templates/html.
*/

/*
	did this instead of
		var app = express();
	because now I can include this file and get the app

	this is useful in the connection.js file
*/

var app = module.exports = express();
/*
  MB: Instead of exporting app like this, you can make a config
      file to host your server settings and export that.
*/


var cookieParser = require('cookie-parser');

var session = require('express-session');
//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 6 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 } }));

/*
  MB: What is the puropse of setting the max age like this?
*/

app.use(cookieParser());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function (a) { return 'FOO!' + a; },
        bar: function (b) { return 'BAR!' + b; },
        /* 
          MB: Is foo and bar code cruft? They look like they should be removed.
        */
        inc: function (value) { return parseInt(value) + 1 },
        breaklines: function (text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
            return new Handlebars.SafeString(text);
        }
    },
    defaultLayout: "main"
});

/*
  MB: Preferably, use fat rocket ES6 functions or methods on objects:
      fat rocket | () => {},
      method | methodName() {},
*/
/*
  MB: Stick with tab = 2 spaces
*/

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var applicationController = require("./controllers/applicationController.js");
var usersController = require("./controllers/usersController.js");
// var groupsController = require("./controllers/groupsController.js");
var votesController = require("./controllers/votesController.js");

// app.get('/hey', function(req, res){
//     res.send('hey there')
// });

app.use("/", applicationController);
app.use("/users", usersController);
app.use("/groups", groupsController);
app.use("/votes", votesController);

var port = process.env.PORT || 3005;
/* 
  MB: This could go in your config file
*/
app.listen(port);

