
const EventEmitter = require('events');

class Logger extends EventEmitter {
    // instance method
    log(message){
        console.log(message);

        // Raise an event
        this.emit('messageLogged', {data: 'https://'});
    }
}

module.exports = Logger; // exporting Logger class