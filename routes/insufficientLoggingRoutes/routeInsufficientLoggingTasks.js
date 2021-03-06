let db = require("../../db");
const fs = require("fs");
const path = require("path");
const logFile = "../../app.log";

const insufficientLoggingTasks = (req, res, next) => {
    var logs = fs.readFileSync(path.resolve(__dirname, logFile)).toString();
    
    let context = {
        vulnerability: "Insufficient logging and monitoring",
        endpoint: req.originalUrl,
        exploit_card: "insufficient_logging_card",
        logs: logs,
    };

    db.all("SELECT * FROM todo WHERE user_id = ?", req.session.user, (err, rows) => {
        context.tasks = rows;
        res.render("secure_tasks", context);
    });
};

module.exports = insufficientLoggingTasks;
