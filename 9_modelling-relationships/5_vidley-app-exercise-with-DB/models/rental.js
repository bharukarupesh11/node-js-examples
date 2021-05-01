const mongoose = require('mongoose');
const Joi = require('joi');
/**  Note: calling a function returned by require and passing Joi as a parameter. And the result of whole 
           require()() again returns a function that we have called in our validation method below in the code
           as Joi.objectId()

           Look for documentation for more details. */
// Joi.objectId = require('joi-objectid')(Joi); // This code added in index.js

// Create a Persistence Schema
const rentalSchema = mongoose.Schema({
    customer: {
        // created custom schema for customer instead of reusing the existing customer schema from customer module same as we used in movie model.
        // The reason for this is because our customer can have 50 properties. We don't wanna have all those properties inside this rental object
        // We only need the primary properties that we need when displaying the list of rentals. So, those absolute essential properties.
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 100
            },
            isGold: {
                type: Boolean,
                default: false // So, by default the customer won't be a gold customer
            },
            phone:{
                type: String,
                required: true,
                minlength: 10,
                maxlength: 10
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}); 

// Create Rental Model 
const Rental = mongoose.model('Rental', rentalSchema);


// Validate Rental
function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(), // instead of string() we've added objectId() to handle invalid id passed by client like "1234"
        movieId: Joi.objectId().required() // instead of string() we've added objectId() to handle invalid id passed by client like "1234"
    };

    // validate rental with joi schema
    const schemaObj = Joi.object(schema); // returns schema object
    return schemaObj.validate(rental); // returns a validation object
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;

