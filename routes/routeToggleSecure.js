const routeToggleSecure = (req, res, next) => {
    if (req.session.secure) {
        req.session.secure = false;
        res.json({"secure": false})
    } else {
        req.session.secure = true;
        res.json({"secure": true})
    }
};   

module.exports = routeToggleSecure;