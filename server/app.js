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

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/html/about.html"));
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
        let insertStartupRequest = "";
        let startupID = Date.now()
        //building insertion requests for toxi schema
        insertStartupRequest += `INSERT INTO startup (startup_id,name,yt_link,email,content)
        VALUES (`+startupID+`,"`+req.body.name+`","`+req.body.youtube+`","`+req.body.email+`","`+req.body.content+`")`;

        let insertStartupToTagRequest = "INSERT OR IGNORE INTO startupTostartTag (startup_id, tag_text) VALUES ";
        req.body.tags.forEach(tag => insertStartupToTagRequest += `(`+startupID+`,"`+tag+`"), `);
        insertStartupToTagRequest = insertStartupToTagRequest.slice(0, -2); 

        db.run(insertStartupRequest)
        .run(insertStartupToTagRequest);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
    res.status(200).send(res.body);
});


app.post("/getStartupsMatchTags", (req, res) => {
    let db = new sqlite3.Database('server/vcLinkDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.serialize(() => {
        let tagList = "";
        req.body.tags.forEach(tag => tagList += `"` + tag + `",`);
        tagList = tagList.slice(0, -1); 
        selectQuery = `SELECT *
        FROM startup
        INNER JOIN startupTostartTag on startup.startup_id = startupTostartTag.startup_id
        WHERE tag_text in (`+ tagList+`)
        GROUP BY startup.startup_id
        HAVING COUNT(*) = ` + req.body.tags.length + `;`;
        console.log(selectQuery)
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(rows);
                res.status(200).send(rows);
            }
            console.log(rows);
        });

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
});

app.post("/insertVC", (req, res) => {
    let db = new sqlite3.Database('server/vcLinkDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.serialize(() => {
        let insertStartupRequest = "";
        let vcID = Date.now()
        //building insertion requests for toxi schema
        insertStartupRequest += `INSERT INTO vc (vc_id,name,text,email)
        VALUES (`+vcID+`,"`+req.body.name+`","`+req.body.text+`","`+req.body.email+`")`;

        let insertStartupToTagRequest = "INSERT OR IGNORE INTO vcTovcTag (vc_id, tag_text) VALUES ";
        req.body.tags.forEach(tag => insertStartupToTagRequest += `(`+vcID+`,"`+tag+`"), `);
        insertStartupToTagRequest = insertStartupToTagRequest.slice(0, -2); 

        db.run(insertStartupRequest)
        .run(insertStartupToTagRequest);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
    res.status(200).send(res.body);
});

app.post("/getVCMatchTags", (req, res) => {
    let db = new sqlite3.Database('server/vcLinkDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.serialize(() => {
        let tagList = "";
        req.body.tags.forEach(tag => tagList += `"` + tag + `",`);
        tagList = tagList.slice(0, -1); 
        selectQuery = `SELECT *
        FROM vc
        INNER JOIN vcTovcTag on vc.vc_id = vcTovcTag.vc_id
        WHERE tag_text in (`+ tagList+`)
        GROUP BY vc.vc_id
        HAVING COUNT(*) = ` + req.body.tags.length + `;`;
        console.log(selectQuery)
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(rows);
                res.status(200).send(rows);
            }
        });

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
});


//404  error page *Always Put Last*
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../public/html/404.html"));
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
