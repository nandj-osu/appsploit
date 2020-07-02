const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();

const app = express();

