var express = require("express");
var path = require("path");

var routes = require("./routes");

var app = express();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

// tell it that static files are rendered from the views directory 
app.use(express.static(__dirname + "/views"));

app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});

/* http shit
var express = require("express");
var path = require("path");

var routes = require("./routes");

var https = require('https');
var fs = require('fs');

var app = express();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

// tell it that static files are rendered from the current directory 
app.use(express.static(__dirname));

https.createServer().listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});

*/
