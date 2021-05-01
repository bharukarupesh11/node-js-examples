const mongoose = require('mongoose');
const Joi = require('joi');


// Create a Persistence Schema
const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    phone:{
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 10
    },

    isGold: {
        type: Boolean,
        default: false // So, by default the customer won't be a gold customer
    }
});

// Create a Model
const Customer = mongoose.model('Customer', customerSchema);


// Validate Customer
function validateCustomer(customer) {
    const namePattern = /^[a-zA-Z\s]{3,100}$/;
    const phonePattern = /^[0-9]{10}$/;

    /** Create a Joi Validation Schema - Validates against the request data from client
     *  Note: This is not a persistence schema. Instead this schema just represents our client request. 
     * */ 
    const schema = {
        name: Joi.string().regex(namePattern).required().messages({
            "string.pattern.base": `"name" must contain alphabets with min. 3 and max. 100 characters`
        }),
        phone: Joi.string().regex(phonePattern).required().messages({
            "string.empty": `"phone" is not allowed to be empty`,
            "string.pattern.base": `"phone" must be 10 digit numerical value`
        }),
        isGold: Joi.boolean().required().messages({
            "boolean.base": `"isGold" must be either true or false`
        })
        
    };
    
    // validate customer with joi schema
    const schemaObj = Joi.object(schema); // returns schema object
    return schemaObj.validate(customer); // returns a validation object
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;