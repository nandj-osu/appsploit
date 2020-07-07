const db = require("../db");
const cryptoFuncs = require("../public/assets/crypto");

const routePostLogin = (req, res, next) => {
    let context = {};
    db.get(`SELECT id, password_sha256 from user WHERE username = ?`, req.body.username, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (!row) {
            context.message = "invalid username and/or password";
            context.messageClass = "alert-danger";
            return res.render("login", context);
        }

        let hash = cryptoFuncs.generateSha256Hash(req.body.password);
        if (hash === row.password_sha256) {
            req.session.user = row.id;
            return res.redirect("/");
        }

        context.message = "invalid username and/or password";
        context.messageClass = "alert-danger";
        res.render("login", context);
    });
};

module.exports = routePostLogin;
