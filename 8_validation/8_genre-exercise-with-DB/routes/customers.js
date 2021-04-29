const {Customer, validateCustomer} = require('../models/customer'); // object destructuring to extract all the exported properties by customer model
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async function(req, res) {
    try{
        const customers = await Customer.find().sort('name');
        res.status(200).send(customers);
    }catch(exception){
        // 404 - Not Found
        res.status(404).send(exception);
    }
});


router.post('/', async (req, res) => {
    // validate customer - Return 400 Bad Request for the invalid body
    const { error } = validateCustomer(req.body);
    console.log(error);
    if(error) {
        return res.status(400).send(error);
    }

    // Check if the requested customer already exists or not- If yes, return 409 - Resource already exists
    let customer  = await Customer.find({phone:req.body.phone});
    console.log(customer);
    
    if(customer.length !== 0) {
        return res.status(409).send(`Error! The customer with phone number ${req.body.phone} already exists.`);
    }

    // Add only new customers: Considering phone number unique
    customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold 
    });

    customer = await customer.save();
    res.status(200).send(customer);
});

router.put('/:id', async (req, res) => {
    //Validate customer - Return 400 Bad Request for the invalid body
    const { error } = validateCustomer(req.body);
    console.log(error);
    if(error) {
        return res.status(400).send(error);
    }
    
    // Update the customer
    const customer = await Customer.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name, 
            phone: req.body.phone, 
            isGold: req.body.isGold
        },
        {
            new: true // to get the new(updated) object
        }
    );
    
    // Return 404 - Not Found, if, provided customer does not exist
    if(!customer) {
        return res.status(404).send('The customer with the given ID was not found!');
    }
    
    // Return reponse to the client
    res.status(200).send(customer);
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    // If we don't have a customer we would return 404
    if(!customer) {
        return res.status(404).send(`The customer with the given ID ${req.params.id} was not found!`);
    }

    // Return response to the client
    res.status(200).send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    // If we don't have a customer we would return 404
    if(!customer) {
        return res.status(404).send('The customer with the given ID was not found!');
    }

    // Return response to the client
    res.status(200).send(customer);
});

module.exports = router; // exporting a router