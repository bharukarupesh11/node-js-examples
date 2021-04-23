
// authentication middleware
// Note: Here, instead of writing module.exports on a separate line we've directly exported the authenticateUser() function 
module.exports = function authenticateUser(req, res, next){
    console.log('Authenticating...');
    next(); // passing a control to the next middleware function to complete the req res cycle
}; 