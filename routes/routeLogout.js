const routeLogout = (req, res, next) => {
    let context = {};
    if (req.session.user) {
        if (req.session.secure){
            req.session.destroy();
        }
        else {
            res.clearCookie('connect.sid', { path: '/' });
        }
        context.message = `You are now logged out`;
        context.messageClass = "alert-danger";
    }
    res.render("login", context);
};

module.exports = routeLogout;
