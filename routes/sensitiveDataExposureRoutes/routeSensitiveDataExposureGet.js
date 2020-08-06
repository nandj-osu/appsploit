let db = require("../../db");
const {execSync} = require('child_process');
const pjson = require("../../package.json");

const routeInjectionTasks = (req, res, next) => {

    let serverString = '';
    if (!req.session.secure) {
        nodeVer = execSync('node -v',{encoding: "UTF-8"}).replace(/\r?\n|\r/g, " ");
        let deps = '';
        for (let key of Object.keys(pjson.dependencies)) {
            deps += `${key}${pjson.dependencies[key]} `;
        }
        serverString = `Server: node ${nodeVer} ${deps}`;
    } 

    let context = {
        vulnerability: "Sensitive data exposure",
        endpoint: req.originalUrl,
        exploit_card: "sensitve_data_card",
        user_id: req.session.user,
        footer: serverString
    };

    var sql = "SELECT * FROM todo WHERE user_id = '" + req.session.user + "';";

    db.all(sql, (err, rows) => {
        context.tasks = rows;
        res.render("secure_data_tasks", context);
    });
};

module.exports = routeInjectionTasks;
