const http = require('http');

/**
 * This server object is an EventEmitter. So, it has all the capabilities of EventEmitter.
 * To prove the above statement open http.server class in HTTP module which extends net.server class and
 * ner.server exteds EventEmitter class. 
 * 
 * So, by inheritance hierarchy all the capabilities of EventEmitter has to come to HTTP class.
 */
const server = http.createServer(); // to create a web server. 

/**
 * on() method is used to listen to the event raised by listen() method.
 * name of the event is 'connection' that we can find in a document.
 * 
 * Registering a listener or handler
 */
server.on('connection', (socket) => {
    console.log('New Connection...');
});

/**
 * When we run this application the server will listen on port 3000
 * Everytime, there's a new connection or new request this server raises an event.
 */
server.listen(3000); // Raises an event

console.log('Listening on port 3000...');


/**
 * Steps To Run this Application:
*   1. Open your terminal and go to the project director
*   2. Run 'node app.js' command to launch the application
*   3. Open browser and type 'localhost:3000' and hit enter key to raise an event on port 3000
*      Note: you'll see the moment you hit enter button the listener listens and gives message 'New connection
*/