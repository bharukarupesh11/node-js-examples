const EventEmitter = require('events'); // returns a class called EventEmitter

const emitter = new EventEmitter();
/**
 * Listener is interested in listening to an event. Listener is a function that would be called when 
 * an event is raised.
 * Below is a way to Register a Listener
 * 
 * Note: on() is an alternate name of addListener() method
 */
emitter.on('messageLogged', function (){
    console.log('Listener called');
}); // name of event, actual listner which is callback function

// Raised an event
emitter.emit('messageLogged'); // emit means making a noise or produce something - in this case we're making a noise in our app by signaling that something has happened

/**
 * Note: Here, sequence of writing a listener and raising event is very important. Because, if we've
 *       registered a listener after raising an event nothing would have happened because when we call
 *       emit() method, the emitter iterates over all the registered listeners and calls them synchronously.
 * 
 *       So, when we raise an event, the callback function of our listener is called.
 */