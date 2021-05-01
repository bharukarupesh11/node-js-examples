const mongoose = require('mongoose');
const Joi = require('joi');
// const {Genre, validateGenre} = require('../models/genre');// object destructuring to extract all the exported properties by genre model
//OR
const {genreSchema} = require('../models/genre');

// Create a Persistence Schema
const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        /* Using Hybrid Approach - Embedding genre object inside movie 
         * To optimize the performance of our query. Also, take into account that it's very unlikely we'll 
         * rename the name of genre in future.
        */
    //    type: Genre.schema, // 1st way - Extracting schema from a model 
        type: genreSchema, // 2nd way 
        required: true   
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

// Create a Model
const Movie = mongoose.model('Movie', movieSchema);


// Validate Movie
function validateMovie(movie) {
    const titlePattern = /^[a-zA-Z0-9\s]{3,50}$/;
    const genrePattern = /^[a-zA-Z\s]{3,50}$/;

    /** Create a Joi Validation Schema - Validates against the request data from client
     *  Note: This is not a persistence schema. Instead this schema just represents our client request. 
     * */ 
    const schema = {
        title: Joi.string().regex(titlePattern).required().messages({
            "string.pattern.base": `"title" must contain alphabets with min. 3 and max. 50 characters`
        }),
        //genre: Joi.object().required(), // using this approach has a problem
        genreName: Joi.string().regex(genrePattern).required().messages({
            "string.pattern.base": `"genreName" must contain alphabets with min. 3 and max. 50 characters`
        }),
        numberInStock: Joi.number().integer().positive().required(),
        dailyRentalRate: Joi.number().integer().positive().required()
    };

    // validate movie with joi schema
    const schemaObj = Joi.object(schema); // returns schema object
    return schemaObj.validate(movie); // returns a validation object
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;

