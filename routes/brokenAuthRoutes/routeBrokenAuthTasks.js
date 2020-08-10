let db = require("../../db");

const routeBrokenAuthTasks = (req, res, next) => {
    let context = {
        vulnerability: "Broken Authentication",
        endpoint: req.originalUrl,
        exploit_card: "broken_auth_card",
    };

    db.all("SELECT * FROM todo WHERE user_id=?", req.session.user, (err, rows) => {
        context.tasks = rows;

        if (req.session.secure) {
            res.render("secure_tasks", context);
        } else {
            res.render("broken_auth_tasks", context);
        }
    });
};

module.exports = routeBrokenAuthTasks;
