let db = require("../../db");

const routeSecureTasks = (req, res, next) => {
    let context = {
        vulnerability: "Select a vulnerability",
        endpoint: req.originalUrl,
        exploit_card: "default_card",
    };

    db.all("select * from todo", [], (err, rows) => {
        context.tasks = rows;
        res.render("secure_tasks", context);
    });
};

module.exports = routeSecureTasks;
