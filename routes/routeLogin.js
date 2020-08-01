let db = require("../db");

const routeLogin = (req, res, next) => {
    let context = {};
    if (req.session.user) {
        context.message = `Currently logged in as: ${req.session.name}`;
        context.messageClass = "alert-danger";
    }
    res.render("login", context);
};

module.exports = routeLogin;
