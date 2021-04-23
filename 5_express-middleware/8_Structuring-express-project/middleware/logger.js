
function logger(req, res, next) {
    console.log('Logging...');
    next(); // passing a control to the next middleware function to complete the req res cycle
}

// exporting logger function
module.exports = logger;