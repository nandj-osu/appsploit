const crypto = require("crypto");
module.exports = {
    generateSha256Hash: function (password) {
        const sha256 = crypto.createHash("sha256");
        const hash = sha256.update(password).digest("base64");
        return hash;
    },

    generateAuthToken: function () {
        return crypto.randomBytes(30).toString("hex");
    },
};
