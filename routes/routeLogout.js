const routeLogout = (req, res, next) => {
    let context = {};
    if (req.session.user) {
        req.session.destroy();
        context.message = `You are now logged out`;
        context.messageClass = "alert-danger";
    }
    res.render("login", context);
};

module.exports = routeLogout;
