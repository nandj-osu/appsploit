let db = require("../../db");

const routeXSSTasks = (req, res, next) => {
    let context = {
        vulnerability: "Using components with known vulnerabilities",
        endpoint: req.originalUrl,
        exploit_card: "known_vul_card",
    };

    db.all("SELECT * FROM todo WHERE user_id=?", req.session.user, (err, rows) => {
        context.tasks = rows;

        if (req.session.secure) {
            res.render("secure_tasks", context);
        } else {
            res.header("Access-Control-Allow-Origin", "*"); 
            res.header("Access-Control-Allow-Headers", 
                "Origin, X-Requested-With, Content-Type, Accept");
            res.render("known_vul_tasks", context);
        }
    });
};

module.exports = routeXSSTasks;
