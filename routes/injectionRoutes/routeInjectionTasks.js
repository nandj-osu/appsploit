let db = require("../../db");

const routeInjectionTasks = (req, res, next) => {
    let context = {
        vulnerability: "Select a vulnerability",
        endpoint: req.originalUrl,
        exploit_card: "injection_card",
    };

    var sql = "SELECT * FROM todo WHERE user_id = '" + req.session.user + "';";

    db.all(sql, (err, rows) => {
        context.tasks = rows;

        if (req.session.secure) {
            res.render("secure_tasks", context);
        } else {
            res.render("injection_tasks", context);
        }
    });
};

module.exports = routeInjectionTasks;
