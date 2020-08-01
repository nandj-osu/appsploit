const db = require("../../db");

const routeSecurityMisconfiguration = (req, res, next) => {
    let context = {
        vulnerability: "Security Misconfiguration",
        endpoint: req.originalUrl,
        exploit_card: "security_misconfiguration_card",
    };
    if (req.session.name !== 'admin' || req.session.secure)  {
        res.render("security_misconfig", context);
        return;
    }
    db.all('SELECT COUNT(*) AS userCount FROM user', (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        context.users = rows[0].userCount;
        db.all('SELECT COUNT(*) AS taskCount FROM todo', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            context.tasks = rows[0].taskCount;
                res.render("security_misconfig", context);
        });
    });
};

module.exports = routeSecurityMisconfiguration;
