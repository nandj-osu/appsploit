const express = require("express");
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const cookieparser = require('cookie-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const app = express();


//
// Configuration
//
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("port", process.argv[2] || 80);
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(session({secret: "secret"}));
app.use('/', express.static('public'));

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


//
// Endpoints
//
app.get('/', function(req, res, next){
    let context = {
        page_views: []
    };

    if(req.session.page_views){
      context.page_views = req.session.page_views++;      
   } else {
      req.session.page_views = 1;
      context.page_views = req.session.page_views;  
   }

    res.render('home', context);
});

app.get('/togglesecure', function(req, res, next) {

    if (req.session.secure) {
        req.session.secure = false;
        res.json({"secure": false})
    } else {
        req.session.secure = true;
        res.json({"secure": true})
    }
});


//
// Error Handlers
//
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500);
    res.render('500');
});


//
// Server entry point
//
app.listen(app.get('port'), function(){
    console.log(`Express started on port ${app.get('port')}`);
});