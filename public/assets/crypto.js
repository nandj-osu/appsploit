const crypto = require("crypto");
module.exports = {
    generateSha256Hash: function (password) {
        const sha256 = crypto.createHash("sha256");
        return sha256.update(password).digest('hex');
    },

    generateAuthToken: function () {
        return crypto.randomBytes(30).toString("hex");
    },
};
