var _ = require('underscore');

/**
 * How Require function works?
 * It goes through the below hierarchy to search for the above package.
 * First it assumes the mentioned module is a Core module. So, in node we don't have a core module called 'underscore'
 * 
 * Next, if the argument to the require() function is like './filename' then it assumes this is a file or folder in the project
 * and it searches for it. But here we neither have a file or folder with the name 'underscore'
 * 
 * Then, it assumes that the module we've specified here exists inside the node_modules folder and it resolves the module
 * 
 * Hierarychy,
 *    1. Core Module OR
 *    2. Files or Folders
 *    3. node_modules
 */


var array = [1, 2, 3];
var isAvailable = _.contains(array, -3); // searches for the value 3 in an array
console.log(isAvailable); // true


/**
 * To run the above example use 'node index.js' command.
 */