const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const express = require('express'); // returns a function
// const logger = require('./logger'); // importing custom middleware
const authentication = require('./authentication'); // importing custom middleware

const app = express(); // calling a function to get the object of type 'Express'

// Setting a view engine for the application
app.set('view engine', 'pug'); // express will internally load pug module so we don't need to use require()
app.set('views', './views'); // put all your views or templates inside a folder called views



// adding a middleware to use this in a request processing pipeline
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true added to remove deprecation warning from the console
app.use(express.static('public')); // to serve static files/resources to a client like images, text files etc.


// custom middleware function
// app.use(logger);
app.use(authentication);

// Configuration
console.log('Application Name: ' +config.get('name'));
console.log('Mail Server: ' +config.get('mail.host'));
console.log('Mail Password: ' +config.get('mail.password'));// Note: Set the environment variable as 'set app_password=rupesh123' otherwise it will throw an error for the below mail.password property

if(app.get('env') === 'development'){
    // 3rd party middleware : Check your console for the logging output of morgan. You'll see log statement for HTTP request sent by client.
    app.use(morgan('tiny')); // 'morgan' is a HTTP request logger middleware for node.js
    // console.log(`Current Environment ${app.get('env')}`);
    startupDebugger('Morgan enabled...'); // calling a debugging function
}

// Some Databse work
databaseDebugger('Connected to the database'); // calling a debugging function

const courses = [
    {id: 1, name: 'Java'}, 
    {id: 2, name: 'PHP'}, 
    {id: 3, name: 'Node Js'}
];


// Listens to an event
app.get('/', function(req, res){
    // res.status(200).send(`Congratulations, You've successfully got the response!`);
    res.status(200).render('index', {title: 'My Express App', message: 'Hello'}); // name of view file
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