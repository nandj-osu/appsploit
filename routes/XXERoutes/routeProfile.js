let db = require("../../db");
let libxmljs = require("libxmljs");

const routeProfile = (req, res, next) => {
    let context = {
        vulnerability: "XML External Entities (XXE)",
        endpoint: req.originalUrl,
        exploit_card: "xxe_card",
    };
    if (req.files) {
        xml = req.files.fileUpload.data;

        let options = {
            noent: true,
            dtdload: true,
        };

        if (req.session.secure) {
            options.noent = false;
            options.dtdload = false;
        }

        let xmlDoc = libxmljs.parseXml(xml, options);

        let name = xmlDoc.get("//name");
        let age = xmlDoc.get("//age");
        let favColor = xmlDoc.get("//favColor");

        context.name = name.text();
        context.age = age.text();
        context.color = favColor.text();
    } else {
        context.name = "";
        context.age = "";
        context.color = "";
    }

    res.render("profile", context);
};

module.exports = routeProfile;
