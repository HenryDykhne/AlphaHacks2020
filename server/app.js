const express = require("express");
const app = express();
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('vcLinkDB.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

//Call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

//Middleware

//Ability to use css, a linkage file
app.use(express.static('public'));

//Setup a "route" to listen on the default url path "http://localhost"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/html/main.html"));
});

app.get("/listing", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/html/listing.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/html/contact.html"));
});

app.post("/insertCompany", (req, res) => {

    return res.send('POST HTTP method on user resource');
});

//404  error page *Always Put Last*
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,"../public/html/404.html"));
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);