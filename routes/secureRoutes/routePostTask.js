let db = require("../../db");

const routePostTask = (req, res, next) => {
    data = [req.body.desc, 0, req.session.user]
    sql = "insert into todo(task_description, task_complete, user_id) values(?,?,?)";
    db.run(sql, data, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    res.redirect(req.originalUrl);
};

module.exports = routePostTask;
