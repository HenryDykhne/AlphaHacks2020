const express = require("express");
const app = express();
const path = require("path");
const bodyParser  = require('body-parser');

const HTTP_PORT = process.env.PORT || 8080;

const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


//Call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

//Middleware

//Ability to use css, a linkage file
app.use(express.static('public'));

//Setup a "route" to listen on the default url path "http://localhost"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/main.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/contact.html"));
});

app.get("/ventureSignUp", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/ventureSignUp.html"));
});

app.get("/companySignUp", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/companySignUp.html"));
});

app.post("/insertStartup", (req, res) => {
    let db = new sqlite3.Database('server/vcLinkDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.serialize(() => {
        let insertRequest = "";
        let startupID = Date.now()
        insertRequest += `INSERT INTO startup (startup_id,name,yt_link,email,content)
        VALUES ("`+startupID+`","`+req.body.name+`","`+req.body.youtube+`","`+req.body.email+`","`+req.body.content+`");`;

        req.body.tags.forEach(tag => insertRequest += `INSERT OR IGNORE INTO startTag (tag_text) VALUES("`+tag+`");`);
        req.body.tags.forEach(tag => insertRequest += `INSERT OR IGNORE INTO startupTostartTag (startup_id, tag_text) VALUES("`+startupID+`","`+tag+`");`);
        
        db.each(insertRequest, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            //console.log(row.id + "\t" + row.name);
        });
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
    res.status(200).send("success");
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);