const express = require("express");
const handlebars = require("express-handlebars").create({
    partialsDir  : [
        'views/partials/'
    ]
});
const bodyparser = require("body-parser");
const cookieparser = require('cookie-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const app = express();


//
// Configuration
//
app.engine("handlebars", handlebars.engine);
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
// Application Endpoints
//
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
// Default Todo Behavior
// 
app.get('/', function(req, res, next){
    let context = {
        vulnerability: "Select a vulnerability",
        endpoint: req.originalUrl
    };

    db.all("select * from todo", [], (err, rows) => {
        context.tasks = rows
        res.render('default/tasks', context);
    })
});

app.post('/', function(req, res, next) {
    
    data = [req.body.desc, 0, 1]

    sql = "insert into todo(task_description, task_complete, user_id) values(?,?,?)"
    db.run(sql, data, function(err){
        if (err) {
            console.error(err.message)
        } 
    })
    res.redirect(req.originalUrl)
})


// 
// Task Endpoints
// 
app.get('/task/:task_id', function(req, res, next) {

    var complete = 0;
    if (req.query.complete === "true") {
        complete = 1
    }
    data = [complete, req.params.task_id]
    sql = "update todo set task_complete = ? where task_id = ?"

    db.run(sql, data, function(err){
        if (err) {
            console.error(err.message)
        } else {
            res.json({"complete": req.query.complete})
        }
    })

})

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