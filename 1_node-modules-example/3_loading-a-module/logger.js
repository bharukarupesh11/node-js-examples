/**
 * Note: The variable and function is scoped to this logger.js file only. They're not available to outside
 *       world. But, how do we make it available outside of this module?
 * 
 *       Use 'export' to export it outside.
 */

// Implementation details
var url = 'http://mylogger.io/log';

// Public Interface
function log(message) {
    // Send an HTTP request
    console.log(message);
}

// module.exports.log = log; // exporting an object
module.exports = log; // exporting only log function
