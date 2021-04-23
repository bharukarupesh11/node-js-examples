/**
 * Note: In the real world we're not going to use this http module to build a backend service for our application. 
 *       The reason for this is, as we can see here, as we add more routes this code gets more complex because
 *       we add all of them in a linear way inside a callback function. 
 * 
 *       Instead we're going to use an express framework which gives us a cleaner structure to handle various routes.
 *       Internally the express framework is built on top of http module of node. 
 */
const http = require('http');



/**
 * This server object is an EventEmitter. So, it has all the capabilities of EventEmitter.
 * To prove the above statement open http.server class in HTTP module which extends net.server class and
 * ner.server exteds EventEmitter class. 
 * 
 * So, by inheritance hierarchy all the capabilities of EventEmitter has to come to HTTP class.
 */
const server = http.createServer(function(req, res) {
    // Route 1
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    // Route 2
    if(req.url === '/api/courses') {
        // returning array of object with list of courses
        res.write(JSON.stringify([{course: 'Java'}, {course: 'Node Js'}]));
        res.end();
    }

}); // to create a web server. 

/**
 * on() method is used to listen to the event raised by listen() method.
 * name of the event is 'connection' that we can find in a document.
 * 
 * Registering a listener or handler below,
 * 
 * Note: In the real life application we don't look for connection as done below which is too low level 
 *       instead we directly pass a callback function to the createServer() method above with request and 
 *       response parameters.
 */
// server.on('connection', (socket) => {
//     console.log('New Connection...');
// });

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
*   3. Open browser and type 'localhost:3000/' and hit enter key to raise an event on port 3000
*      Note: you'll see, the moment you hit enter button the listener listens the request from client and 
             gives response as 'Hello World' to the client.

             OR
*   4. Open browser and type 'localhost:3000/api/courses' and hit enter key to raise an event on port 3000
*      Note: you'll see, the moment you hit enter button the listener listens the request from client and 
             gives response as [{"course":"Java"},{"course":"Node Js"}] to the client.
*/