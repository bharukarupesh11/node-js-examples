const morgan = require('morgan');
const express = require('express'); // returns a function
const logger = require('./logger');
const authentication = require('./authentication');

const app = express(); // calling a function to get the object of type 'Express'

// adding a middleware to use this in a request processing pipeline
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true added to remove deprecation warning from the console
app.use(express.static('public')); // to serve static files/resources to a client like images, text files etc.

// custom middleware function
// app.use(logger);
app.use(authentication);


// 3rd party middleware : Check your console for the logging output of morgan. You'll see log statement for HTTP request sent by client.
app.use(morgan('tiny')); // 'morgan' is a HTTP request logger middleware for node.js


const courses = [
    {id: 1, name: 'Java'}, 
    {id: 2, name: 'PHP'}, 
    {id: 3, name: 'Node Js'}
];


// Listens to an event
app.get('/', function(req, res){
    // res.status(404).send(`Sorry, Can't find the requested resource!`);
    res.status(200).send(`Congratulations, You've successfully got the response!`);
});


app.get('/api/courses', (req, res) => {
    res.status(200).send(JSON.stringify([
                            {id: 1, name: 'Java'}, 
                            {id: 2, name: 'PHP'}, 
                            {id: 3, name: 'Node Js'}
                        ]));
});


// Routing Parameter: HTTP Post Request
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.status(200).send(course);
});


// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));