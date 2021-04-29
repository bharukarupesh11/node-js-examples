const mongoose = require('mongoose');
const Joi = require('joi');


// Create a Schema
const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

// Create a Model
const Genre = mongoose.model('Genre', genreSchema);


// Need to write custom message and regEx code same as customer 
function validateGenre(genre) {
    const genrePattern = /^[a-zA-Z\s]{3,50}$/;

    // create a schema
    const schema = {
        name: Joi.string().regex(genrePattern).required().messages({
            "string.pattern.base": `"name" must contain alphabets with min. 3 and max. 50 characters`
        })
    };

    // validate genre with schema
    const schemaObj = Joi.object(schema); // returns schema object
    return schemaObj.validate(genre, schema); // returns a validation object
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;