let db = require("../../db");
let serialize = require("node-serialize");

const routePostTask = (req, res, next) => {
    if (req.session.secure) {
        let json = JSON.parse(req.body.desc);

        if (json.desc) {
            data = [json.desc, 0, req.session.user];
            sql = "insert into todo(task_description, task_complete, user_id) values(?,?,?)";
            db.run(sql, data, function (err) {
                if (err) {
                    console.error(err.message);
                }
            });

            req.session.flash = {
                message: "JSON successfully processed",
                class: "alert-success",
            };
        } else {
            req.session.flash = {
                message: "Invalid json posted",
                class: "alert-warning",
            };
        }
    } else {
        let json = serialize.unserialize(req.body.desc);
    }

    res.redirect(req.originalUrl);
};

module.exports = routePostTask;
