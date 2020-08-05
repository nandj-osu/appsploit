let db = require("../../db");

const routeInjectionPostTask = (req, res, next) => {
    if (req.session.secure) {
        data = [req.body.desc, 0, req.session.user];
        sql = "insert into todo(task_description, task_complete, user_id) values(?,?,?)";
        db.run(sql, data, function (err) {
            if (err) {console.error(err.message);}
        });

    } else {
        sql =
            "insert into todo(task_description, task_complete, user_id) values('" +
            req.body.desc +
            "'," +
            0 +
            ",'" +
            req.session.user +
            "')";
            
        db.exec(sql, function (err) {
            if (err) {
                console.error(err.message);
            }
        });
    }
    res.redirect(req.originalUrl);
};

module.exports = routeInjectionPostTask;
