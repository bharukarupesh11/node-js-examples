const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type Express 

app.use(express.json());

// To remove deprecation warnings given by connect() method below
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// Connect mongodb - movies collection
mongoose.connect('mongodb://localhost:27017/movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Could not connect to MongoDB...', error));


// Creating a Genre Schema with Validation
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, 
        maxlength: 255
    }
});

// Create a Genre Model
const Genre = mongoose.model('Genre', genreSchema); // creates a Genre class(model)


app.get('/api/genres', function(req, res) {
    getAllGenres(req, res);
});

async function getAllGenres(req, res) {
    try{
        const genres = await Genre.find(); // to get all the documents
        res.status(200).send(genres);
    }catch(exception){
        console.log(exception);
        // 404 - The requested resource not found
        res.status(404).send(exception);
    }
}


app.post('/api/genre', (req, res) => {
    // validate genres - Return 400 Bad Request for the invalid body
    const { error } = validateGenre(req.body);
    
    if(error) {
        // 400 - Bad Request
        return res.status(400).send(error);
    }

    //(Check if the provided genres already exists - If yes, return 409 - Resource already exist)s
    /*let genre = movie_genres.find( m => m.name.toLowerCase() === req.body.name.toLowerCase());
    if(genre) {
        return res.status(409).send('Error! This genre already exists.');
    }*/

    // Add the genres
    saveGenre(req, res);
});

async function saveGenre(req, res) {
    const genre = new Genre({
        name: req.body.name
    });
    
    try{
        // Save in DB
        const result = await genre.save();
        console.log(result);
        res.status(200).send(result);
    }catch(exception){
        console.log('Error: ', exception.messgae);
        // 400 - Bad Request
        res.status(400).send(exception);
    }
}

function validateGenre(genre) {
    // create a schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    // validate genre with schema
    const schemaObj = Joi.object(schema); // returns schema object
    return schemaObj.validate(genre, schema); // returns a validation object
}

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}....`));