const db = require("../db");

const routeRegister = (req, res, next) => {
    let context = {};
    context.message =
        "Warning! If this website is hosted online, the username and password you register will be exposed to other users.";
    context.messageClass = "alert-danger";
    res.render("register", context);
};

module.exports = routeRegister;
