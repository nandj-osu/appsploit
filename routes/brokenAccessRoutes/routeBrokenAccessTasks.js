let db = require("../../db");

const routeBrokenAccessTasks = (req, res, next) => {
    let context = {
        vulnerability: "Broken Access Control",
        endpoint: req.originalUrl,
        exploit_card: "broken_access_card",
    };

    if (req.session.secure) {
        db.all("SELECT * FROM todo WHERE user_id = ?", req.session.user, (err, rows) => {
            context.tasks = rows;
            res.render("secure_tasks", context);
        });

    } else{
        db.all("SELECT * FROM todo WHERE user_id = ?", req.query.id, (err, rows) => {
            context.tasks = rows;
            res.render("secure_tasks", context);
        });
    }
};

module.exports = routeBrokenAccessTasks;
