const db = require("../db");
const cryptoFuncs = require("../public/assets/crypto");

const routePostLogin = (req, res, next) => {
    let context = {};
    if (req.session.secure && req.body.username === 'admin') {
        res.render("403", context);
        return;
    }
    db.get(`SELECT id, username, password_sha256 from user WHERE username = ?`, req.body.username, (err, row) => {
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
            req.session.name = row.username;
            return res.redirect("/");
        }

        context.message = "invalid username and/or password";
        context.messageClass = "alert-danger";
        res.render("login", context);
    });
};

module.exports = routePostLogin;
