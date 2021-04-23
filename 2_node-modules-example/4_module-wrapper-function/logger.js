/**
 * Every module in node has a wrapper function deined by node itself which looks as below,
 * (function (exports, require, module, __filename, __dirname) {
 *      // module file code goes here. That means all our code in logger.js will be here in this body
 *      var url = 'http://mylogger.io/log';

        // Public Interface
        function log(message) {
            // Send an HTTP request
            console.log(message);
        }

        // module.exports.log = log; // exporting an object
        module.exports = log; // exporting only log function
    });

    // This is how node loads every module that we create.
 */

// let's see the value of some variables in above function 
console.log(__filename); // will print logger.js file path
console.log(__dirname);  // will print logger.js directory path

// Implementation details
var url = 'http://mylogger.io/log';

// Public Interface
function log(message) {
    // Send an HTTP request
    console.log(message);
}

// module.exports.log = log; // exporting an object
module.exports = log; // exporting only log function
