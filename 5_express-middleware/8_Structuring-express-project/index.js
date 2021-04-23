const startupDebugger = require('debug')('app:startup');
// const databaseDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan'); //3rd party middleware
const logger = require('./middleware/logger'); // importing custom middleware
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');

const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type 'Express'

// Setting a view engine for the application
app.set('view engine', 'pug'); // express will internally load pug module so we don't need to use require()
app.set('views', './views'); // put all your views or templates inside a folder called views


// adding a middleware to use this in a request processing pipeline
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true added to remove deprecation warning from the console
app.use(express.static('public')); // to serve static files/resources to a client like images, text files etc.
app.use('/api/courses', courses); // Here, we're telling express that for any routes that start with '/api/courses' then use the 'courses' router which is loaded from the courses module.
app.use('/', homepage); // Here, we're telling express that for any routes that start with '/' then use the 'homepage' router which is loaded from the homepage module.

// Configuration
console.log('Application Name: ' +config.get('name'));
console.log('Mail Server: ' +config.get('mail.host'));
console.log('Mail Password: ' +config.get('mail.password')); // Note: Set the environment variable as 'set app_password=rupesh123' otherwise it will throw an error for the below mail.password property

if(app.get('env') === 'development'){
    app.use(morgan('tiny')); // 3rd party middleware : 'morgan' is a HTTP request logger middleware for node.js. Check your console for the logging output of morgan and you'll see log statement for HTTP request sent by client.
    startupDebugger('Morgan enabled...'); // calling a debugging function
}

app.use(logger); // calling a custom middleware function logger() provided by logger module above

// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));