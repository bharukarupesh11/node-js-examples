const mongoose = require('mongoose');
const Joi = require('joi');


// Create a Persistence Schema
const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true, // genre need to be unique value
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    }
});

// Create a Model
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const genrePattern = /^[a-zA-Z\s]{3,50}$/;

    /** Create a Joi Validation Schema - Validates against the request data from client
     *  Note: This is not a persistence schema. Instead this schema just represents our client request. 
     * */ 
    const schema = {
        name: Joi.string().regex(genrePattern).required().messages({
            "string.pattern.base": `"name" must contain alphabets with min. 3 and max. 50 characters`
        })
    };

    // validate genre with schema
    const schemaObj = Joi.object(schema); // returns schema object
    return schemaObj.validate(genre); // returns a validation object
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;