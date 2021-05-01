const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // load once and use everywhere in the project to validate your objectId's sent by client - See the validation methods in models for reference
const mongoose = require('mongoose');
const genres = require('./routes/genres'); // importing genres module
const customer = require('./routes/customers');
const movie = require('./routes/movies');
const rental = require('./routes/rentals');
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type Express 

app.use(express.json());
app.use('/api/genre', genres); // we're telling express that for any route that starts with '/api/genres' then use genres router which is loaded from the genres module.
app.use('/api/customer', customer); // 2nd parameter is to delegate the request to customer router defined above using require() method
app.use('/api/movie', movie); // 2nd parameter is to delegate the request to movie router defined above using require() method
app.use('/api/rental', rental); // 2nd parameter is to delegate the request to rental router defined above using require() method

// To remove deprecation warnings given by connect() method below
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// Connect mongodb - vidly database
mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.error('Could not connect to MongoDB...', error));


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}....`));