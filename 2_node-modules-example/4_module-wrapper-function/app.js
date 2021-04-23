// Loading a module
// As a best practice we shall store the result of loading a module in constant 
// because we don't want to accidently overwrite the value of logger here. Eg. const logger = require(path_to_module_file);
const log = require('./logger'); // require() returns an object that is exported from a target module

// console.log(logger); // you''ll see an object
// logger.log('message'); // calling a log function of logger module

log('calling a log function directly'); // because only funtion is exported from logger.js module