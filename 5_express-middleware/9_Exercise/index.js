const Joi = require('joi');
const genres = require('./routes/genres'); // importing genres module
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type Express 

app.use(express.json());
app.use('/api/genres', genres); // we're telling express that for any route that starts with '/api/genres' then use genres router which is loaded from the genres module.


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}....`));