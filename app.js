var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

//Call this function after the http server starts listening for requests
function onHttpStart()
{
    console.log("Express http server listening on: " + HTTP_PORT);
}

//Middleware

//Ability to use css, a linkage file
app.use(express.static('public'));

//Setup a "route" to listen on the default url path "http://localhost"
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"/public/html/main.html"));
});

app.get("/listing", function(req, res){
    res.sendFile(path.join(__dirname,"/public/html/listing.html"));
});

app.get("/contact", function(req, res){
    res.sendFile(path.join(__dirname,"/public/html/contact.html"));
});

//404  error page *Always Put Last*
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,"/html/404.html"));
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);