const express = require("express");
const handlebars = require("express-handlebars").create({
    partialsDir: ["views/partials/"],
});
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const app = express();

// Database object
var db = require("./db");

//
// Require modular routing files
//
const routeInstructions = require("./routes/routeInstructions");
const routeToggleSecure = require("./routes/routeToggleSecure");

const routeToggleTask = require("./routes/routeToggleTask");
const routeDeleteTask = require("./routes/routeDeleteTask");

const routeLogin = require("./routes/routeLogin.js");
const routeRegister = require("./routes/routeRegister.js");
const routePostRegister = require("./routes/routePostRegister.js");
const routePostLogin = require("./routes/routePostLogin.js");

// Secured
const routePostTask = require("./routes/secureRoutes/routePostTask");
const routeSecureTasks = require("./routes/secureRoutes/routeSecureTasks");

// XSS
const routeXSSTasks = require("./routes/XSSRoutes/routeXSSTasks");
const routeXSSPostTask = require("./routes/secureRoutes/routePostTask");

// Using known vulnerable components
const routeKnownVulTasks = require("./routes/KnownVulRoutes/routeKnownVulTasks");
const routeKnownVulPostTask = require("./routes/secureRoutes/routePostTask");



//
// Configuration
//
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.argv[2] || 80);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(session({ secret: "secret" }));
app.use("/", express.static("public"));

//
// Middleware
//
app.use((req, res, next) => {
    res.locals.secure = req.session.secure;
    next();
});

function requireAuth(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

/*******************************************************************************
 * Set routes here
 *
 * Controller functions
 ********************************************************************************/

// Secure routes
app.get("/", requireAuth, (req, res, next) => routeSecureTasks(req, res, next));
app.post("/", (req, res, next) => routePostTask(req, res, next));

// XSS routes
app.get("/xss", requireAuth, (req, res, next) => routeXSSTasks(req, res, next));
app.post("/xss", (req, res, next) => routeXSSPostTask(req, res, next));

// Static pages & general routes
app.get("/instructions", (req, res, next) => routeInstructions(req, res, next));
app.get("/togglesecure", (req, res, next) => routeToggleSecure(req, res, next));
app.get("/login", (req, res, next) => routeLogin(req, res, next));
app.get("/register", (req, res, next) => routeRegister(req, res, next));
app.post("/register", (req, res, next) => routePostRegister(req, res, next));
app.post("/login", (req, res, next) => routePostLogin(req, res, next));

// Task Endpoints
app.get("/task/:task_id", (req, res, next) => routeToggleTask(req, res, next));
app.delete("/task/:task_id/", (req, res, next) => routeDeleteTask(req, res, next));

// Error Handlers
app.use(function (req, res) {
    res.status(404);
    res.render("404");
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render("500");
});

/*******************************************************************************
 * End controller functions
 ******************************************************************************/

//
// Server entry point
//
app.listen(app.get("port"), function () {
    console.log(`Express started on port ${app.get("port")}`);
});
