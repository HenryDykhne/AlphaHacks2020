const PORT = process.env.PORT || 3000;
const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./vcLinkDB.db');

app.use(express.static(publicDirectoryPath,{
    extensions: ['html']
}));

app.

app.listen(PORT, () => {
    console.log('server is up on port: ' + PORT)
});