var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var path  = require('path');

var routes = require("./app/routing");

app.use(routes);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require(path.join(__dirname, "./app/routing/apiRoutes"))(app)
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app)

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  
