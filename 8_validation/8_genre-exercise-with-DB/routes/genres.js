const {Genre, validateGenre} = require('../models/genre');// object destructuring to extract all the exported properties by genre model
const express = require('express');
const router = express.Router();


router.get('/', async function(req, res) {
    try{
        const genres = await Genre.find().sort('name');
        res.status(200).send(genres);
    }catch(exception){
        // 404 - Not Found
        res.status(404).send(exception);
    }
});


router.post('/', async (req, res) => {
    // validate genres - Return 400 Bad Request for the invalid body
    const { error } = validateGenre(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    //(Check if the provided genres already exists - If yes, return 409 - Resource already exist)s
    /*let genre = movie_genres.find( m => m.name.toLowerCase() === req.body.name.toLowerCase());
    if(genre) {
        return res.status(409).send('Error! This genre already exists.');
    }*/

    // Add the genres
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(200).send(genre);
});

router.put('/:id', async (req, res) => {
    //Validate genres - Return 400 Bad Request for the invalid body
    const { error } = validateGenre(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }
    
    const genre = await Genre.findByIdAndUpdate(
        req.params.id, 
        {name: req.body.name},
        {new: true});
    
    // Check if the provided genres exists or not - If yes, return 404 - Not Found
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found!');
    }
    
    //(Updating the genre
    res.status(200).send(genre);
});


router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    // If we don't have a genre we would return 404
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found!');
    }

    // Return the response
    res.status(200).send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    // If we don't have a genre we would return 404
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found!');
    }

    // Return the response
    res.status(200).send(genre);
});

module.exports = router; // exporting a router