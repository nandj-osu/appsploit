let db = require("../db");

const routeToggleTask = (req, res, next) => {
    var complete = 0;
    if (req.query.complete === "true") {
        complete = 1;
    }
    data = [complete, req.params.task_id];
    sql = "update todo set task_complete = ? where task_id = ?";

    db.run(sql, data, function (err) {
        if (err) {
            console.error(err.message);
        } else {
            res.json({ complete: req.query.complete });
        }
    });
};

module.exports = routeToggleTask;
