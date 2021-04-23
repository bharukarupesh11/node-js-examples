const EventEmitter = require('events'); // returns a class called EventEmitter

const emitter = new EventEmitter();
/**
 * Listener is interested in listening to an event. Listener is a function that would be called when 
 * an event is raised.
 * Below is a way to Register a Listener
 * 
 * Note: on() is an alternate name of addListener() method
 * 
 * Param: name of event, actual listner which is a callback function
 */
// emitter.on('messageLogged', function (arg){
//     console.log('Listener called:', arg);
// }); 

// converting above code with fat arrow function
emitter.on('messageLogged', arg => console.log('Listener called: ', arg));



/**
 * Raising an event means making a noise by signalling that something is happened. Now, quite often, while
 * raising an event we also want to send some data about that event. So that's that second parameter to our emit() method here.
 * 
 * Below is a way to raise an event. 
 * 
 * The data sent with an event is called an event argument. 
 */
emitter.emit('messageLogged', {id: 1, url: 'http://'}); // emit means making a noise or produce something 

/**
 * Note: Here, sequence of writing a listener and raising event is very important. Because, if we've
 *       registered a listener after raising an event nothing would have happened because when we call
 *       emit() method, the emitter iterates over all the registered listeners and calls them synchronously.
 * 
 *       So, when we raise an event, the callback function of our listener is called.
 */