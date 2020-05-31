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
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/html/main.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/contact.html"));
});

app.get("/listing", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/html/companyListingCreate.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/html/vcListingCreate.html"));
});


//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);