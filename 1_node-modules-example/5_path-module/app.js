/**
 * If path is not specified, node will assume it as a built in module
 */
const path = require('path');

var pathObj = path.parse(__filename);
console.log(pathObj);