let db = require("../db");

const routeLogin = (req, res, next) => {
    let context = {};
    res.render('login', context);
};

module.exports = routeLogin;