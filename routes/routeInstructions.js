const routeInstructions = (req, res, next) => {
    let context = {
        vulnerability: "Select a vulnerability",
    };
    res.render("instructions", context);
};

module.exports = routeInstructions;
