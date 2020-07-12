let db = require("../../db");

const routeXSSTasks = (req, res, next) => {
    let context = {
        vulnerability: "Insecure deserialization",
        endpoint: req.originalUrl,
        exploit_card: "insec_deserial_card",
    };

    db.all("SELECT * FROM todo WHERE user_id=?", req.session.user, (err, rows) => {
        context.tasks = rows;
        res.render("insec_deserial_tasks", context);
    });
};

module.exports = routeXSSTasks;
