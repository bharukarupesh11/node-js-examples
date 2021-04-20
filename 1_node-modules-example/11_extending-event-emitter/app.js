const Logger = require('./logger'); // returns a Logger class
const logger = new Logger(); // creating Logger object

/** 
 * Registering a listener on logger object since Logger class has extened the EventEmitter, it has all the
 * capabilities of EventEmitters.
*/ 
// logger.on('messageLogged', function(arg){
//     console.log('Listener called: ', arg);
// });

// Changing above code with fat arrow function
logger.on('messageLogged', arg => console.log('Listener called: ', arg));

logger.log('message'); // calling a log() method


/**
 * Note: It's important to note that the listener should always be written before an event is 
 *       raised same as above.
 *          
 *       To know the reason, open "8 events-module" example.
 */