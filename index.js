const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();

const app = express();


// 
// Connect to database
// 
let db = new sqlite3.Database('./db/appsploit.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the appsploit database.');
  }
});