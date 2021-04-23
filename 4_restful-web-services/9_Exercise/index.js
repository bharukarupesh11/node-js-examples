const Joi = require('joi');
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type Express 

const express = app.use(express.json());


const movie_genres = [
    { genreid: 1, name: "Action" },
    { genreid: 2, name: "Thriller"},
    { genreid: 3, name: "Fiction"},
    { genreid: 4, name: "Dark Comedy"},
    { genreid: 5, name: "Biography"},
];


app.get('/api/genres', function(req, res) {
    res.status(200).send(movie_genres);
});


app.post('/api/genre', (req, res) => {
    // validate genres - Return 400 Bad Request for the invalid body
    const { error } = validateGenre(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    //(Check if the provided genres already exists - If yes, return 409 - Resource already exist)s
    let genre = movie_genres.find( m => m.name.toLowerCase() === req.body.name.toLowerCase());
    if(genre) {
        return res.status(409).send('Error! This genre already exists.');
    }

    // Add the genres
    genre = { 
        genreid: movie_genres.length + 1, 
        name: req.body.name
    };

    movie_genres.push(genre);
    res.status(200).send(genre);

});

app.put('/api/genre/:id', (req, res) => {
    // Check if the provided genres already(exists - If yes, return 404 - Not Found
    let genre = movie_genres.find(m => m.genreid === parseInt(req.params.id));
    
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found!');
    }
    
    //(Validate genres - Return 400 Bad Request for the invalid bod)y
    const { error } = validateGenre(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    //(Updating the genr)e
    genre.name = req.body.name;
    res.status(200).send(genre);
});


app.delete('/api/genre/:id', (req, res) => {
    // Check if the provided genres already(exists - If yes, return 404 - Not Found
    let genre = movie_genres.find(m => m.genreid === parseInt(req.params.id));
    
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found!');
    }

    // Delete the genre name
    const indexOfGenre = movie_genres.indexOf(genre);
    movie_genres.splice(indexOfGenre, 1); // delete 1 genre of the given index

    // Return the response
    res.status(200).send(genre);
});

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