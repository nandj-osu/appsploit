const routeToggleSecure = (req, res, next) => {
    if (req.session.secure) {
        console.log(`[${new Date().toUTCString()}] Secure mode OFF`)
        req.session.secure = false;
        res.json({ secure: false });
    } else {
        console.log(`[${new Date().toUTCString()}] Secure mode ON`)
        req.session.secure = true;
        res.json({ secure: true });
    }
};

module.exports = routeToggleSecure;
