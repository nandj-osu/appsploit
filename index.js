const express = require("express");
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const fileUpload = require("express-fileupload");
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
const routeLogout = require("./routes/routeLogout.js");

// Secured
const routePostTask = require("./routes/secureRoutes/routePostTask");
const routeSecureTasks = require("./routes/secureRoutes/routeSecureTasks");

// XSS
const routeXSSTasks = require("./routes/XSSRoutes/routeXSSTasks");
const routeXSSPostTask = require("./routes/secureRoutes/routePostTask");

// Using known vulnerable components
const routeKnownVulTasks = require("./routes/knownVulRoutes/routeKnownVulTasks");
const routeKnownVulPostTask = require("./routes/secureRoutes/routePostTask");

// Insecure deserialization
const routeInsecureDeserialTasks = require("./routes/insecureDeserialRoutes/routeInsecureDeserialTasks");
const routeInsecureDeserialPostTask = require("./routes/insecureDeserialRoutes/routeInsecureDeserialPostTask");

//XXE
const routeProfile = require("./routes/XXERoutes/routeProfile");
const routeSecurityMisconfiguration = require("./routes/securityMisconfigRoutes/securityMisconfiguration");

//Injection
const routeInjectionTasks = require("./routes/injectionRoutes/routeInjectionTasks");
const routeInjectionPostTask = require("./routes/injectionRoutes/routeInjectionPostTask");
const routeInjectionResetUser1 = require("./routes/injectionRoutes/routeInjectionResetUser1");

//Broken Access Control
const routeBrokenAccessControl = require("./routes/brokenAccessRoutes/routeBrokenAccessTasks");

//Sensitive Data Exposure
const routeSensitiveDataExposureGet = require("./routes/sensitiveDataExposureRoutes/routeSensitiveDataExposureGet");
const routeSensitiveDataExposurePost = require("./routes/sensitiveDataExposureRoutes/routeSensitiveDataExposurePost");

//
// Configuration
//

app.engine(
    "handlebars",
    handlebars({
        helpers: require("./views/helpers"),
    })
);
app.set("view engine", "handlebars");
app.set("port", process.argv[2] || 80);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(session({ secret: "secret" }));
app.use("/", express.static("public"));
app.use(fileUpload());

//
// Middleware
//
app.use((req, res, next) => {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    res.locals.secure = req.session.secure;
    res.locals.session = req.session;
    next();
});

function requireAuth(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

function requireAdmin(req, res, next) {
    if (req.session.name !== "admin") {
        res.render("403");
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

// Known Vulnerability routes
app.get("/know-vulnerabilities", requireAuth, (req, res, next) => routeKnownVulTasks(req, res, next));
app.post("/know-vulnerabilities", (req, res, next) => routeKnownVulPostTask(req, res, next));

// Insecure deserialization
app.get("/insecure-deserialization", requireAuth, (req, res, next) => routeInsecureDeserialTasks(req, res, next));
app.post("/insecure-deserialization", (req, res, next) => routeInsecureDeserialPostTask(req, res, next));

//XXE routes
app.get("/xxe", requireAuth, (req, res, next) => routeProfile(req, res, next));
app.post("/xxe", requireAuth, (req, res, next) => routeProfile(req, res, next));

//Injection routes
app.get("/injection", requireAuth, (req, res, next) => routeInjectionTasks(req, res, next));
app.post("/injection", requireAuth, (req, res, next) => routeInjectionPostTask(req, res, next));
app.post("/injection/reset-user1", requireAuth, (req, res, next) => routeInjectionResetUser1(req, res, next));

//Security Misconfiguration
app.get("/security-misconfiguration", requireAuth, (req, res, next) => routeSecurityMisconfiguration(req, res, next));

//Broken Access Control routes
app.get("/broken-access-control", requireAuth, (req, res, next) => routeBrokenAccessControl(req, res, next));

//Sensitive Data Exposure routes
app.get("/sensitive-data", requireAuth, (req, res, next) => routeSensitiveDataExposureGet(req, res, next));
app.post("/sensitive-data", requireAuth, (req, res, next) => routeSensitiveDataExposurePost(req, res, next));

// Static pages & general routes
app.get("/instructions", (req, res, next) => routeInstructions(req, res, next));
app.get("/togglesecure", (req, res, next) => routeToggleSecure(req, res, next));
app.get("/login", (req, res, next) => routeLogin(req, res, next));
app.get("/register", (req, res, next) => routeRegister(req, res, next));
app.post("/register", (req, res, next) => routePostRegister(req, res, next));
app.post("/login", (req, res, next) => routePostLogin(req, res, next));
app.get("/logout", (req, res, next) => routeLogout(req, res, next));

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
