const Handlebars = require("handlebars");

let helpers = module.exports;

helpers.json = function(context) {
    return JSON.stringify(context);
}

helpers.sanitize_scripts = function(context) {

    let html = context;
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (SCRIPT_REGEX.test(html)) {
        html = html.replace(SCRIPT_REGEX, "");
    }

    return new Handlebars.SafeString(html);
}