let db = require("../../db");
let fs = require("fs");
let path = require("path");
let sql = fs.readFileSync(path.resolve(__dirname, "../../db/reset_user1_tasks.sql")).toString();

const routeInjectionResetUser1 = (req, res, next) => {

    db.exec(sql, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    res.redirect("/injection");
};

module.exports = routeInjectionResetUser1;
