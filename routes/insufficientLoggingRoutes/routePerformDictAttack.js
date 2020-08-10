//Using node's "exec" function: https://stackabuse.com/executing-shell-commands-with-node-js/

const { exec } = require("child_process");
const path = require("path");
const script = path.resolve(__dirname, "../../scripts/dict_attack.py");

const performDictAttack = (req, res, next) => {
    var app_url = `${req.protocol}://${req.hostname}`;
    var cmd;
    const target_user = "system_admin";
    if (req.session.secure) {
        cmd = `python ${script} ${app_url} ${target_user} secure`;
    } else {
        cmd = `python ${script} ${app_url} ${target_user} unsecure`;
    }

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.redirect("/logging-monitoring");
    });
};

module.exports = performDictAttack;
