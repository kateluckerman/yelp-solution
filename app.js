var express = require("express");
var path = require("path");

var routes = require("./routes");

var app = express();

// Using ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

// Static files are rendered from the views directory 
app.use(express.static(__dirname + "/views"));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port);
