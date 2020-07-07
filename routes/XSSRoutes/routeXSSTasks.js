let db = require("../../db");

const routeXSSTasks = (req, res, next) => {
    let context = {
        vulnerability: "Cross-site scripting (XSS)",
        endpoint: req.originalUrl,
        exploit_card: "xss_card",
    };

    db.all("SELECT * FROM todo WHERE user_id=?", req.session.user, (err, rows) => {
        context.tasks = rows

        if (req.session.secure) {
            res.render("secure_tasks", context);
        } else {
            res.render("xss_tasks", context);
        }
    });
};

module.exports = routeXSSTasks;
