const db = require("../db");

const routeRegister = (req, res, next) => {
    let context = {};
    res.render('register', context);
};

module.exports = routeRegister;