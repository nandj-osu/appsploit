let db = require("../db");

const routeDeleteTask = (req, res, next) => {
    data = [req.params.task_id];
    sql = "delete from todo where task_id = ?";
    db.run(sql, data, function (err) {
        if (err) {
            console.error(err.message);
        } else {
            res.sendStatus(200);
        }
    });
};

module.exports = routeDeleteTask;
