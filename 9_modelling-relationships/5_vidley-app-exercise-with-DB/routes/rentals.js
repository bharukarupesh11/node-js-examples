const {Rental, validateRental} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn'); // returns a class
const express = require('express');
const router = express.Router();

Fawn.init(mongoose); // pass mongoose object that we loaded on line number 4


router.get('/', async function(req, res) {
    try{
        const rentals = await Rental.find().sort('-dateOut'); // sorting by dateOut in a descending order
        res.status(200).send(rentals);    
    }catch(exception){
        // 404 - Not Found
        res.status(404).send(exception);
    } 
});


router.post('/', async (req, res) => {
    
    const { error } = validateRental(req.body);
    if(error) return res.status(400).send(error);// 400 - Bad Request for the invalid body

    /**
     * One way to fix invalid id problem for both customer and movie is add below code but this is not a 
     * good solution as this is a part of validation and should be validated in above validateRental method
     * 
     * So, for better implementation have a look at validateRental() method and remove the below code.
            if(!mongoose.Types.ObjectId.isValid(req.body.customerId))    
                return res.status(400).send('Invalid customer.'); */ 
    
    
    const customer = await Customer.findById(req.body.customerId);
    console.log(customer);
    if(!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    /**
     * Note: Here, we've 2 separate operations to save rental and to save movie. It is possible that after we
     *       save the rental something goes wrong, maybe our server crashes or connection to mongodb drops.
     *       So, perhaps the second operation will not complete. That's where we need a transaction. So, with 
     *       transaction we can ensure that both these opeartion will update the state of our data in the database
     *       or none of them will apply. So, they are atomic, they both complete or they both rollback.
     * 
     *       So, in almost all the relational databases we have this concept of transaction but in mongodb we
     *       don't really have transactions. So, there's a technique called 2 phase commit to solve this issue.
     *       
     *       Refer, Readme file to know more:
     *       Below is our general code withour transaction and 2 phase commit:
                rental = await rental.save();
                movie.numberInStock--; // Update the movie stock once provided on rent to the customer
                await movie.save();
     */
   
    try{
        // Using fawn transaction technique
        new Fawn.Task()
            .save('rentals', rental) // name of collection which is case sensitive and plural in DB
            .update('movies', {_id: movie._id}, {
                $inc: {numberInStock: -1}
            }) // collection name, id to determine the movie that should be updated, updateObject
            .run();

        res.status(200).send(rental);
    }catch(exception){
        // 500 - Internal server error
        res.status(500).send('Something failed.')
    } 
});


// router.put('/:id', async (req, res) => {
    // I think the customer and movie details in rental shall be updated 
    // while updating customer details in customer router and movie details in movie router
    // Or else need to give more thought to it
// });


router.get('/:id', async (req, res) => {
    // Validating object id sent by client - ObjectId should be 24 characters long string value
    if (!mongoose.Types.ObjectId.isValid(objectId))
        return res.status(400).send('Invalid rental.'); // 400 - Bad Request 

    const rental = await Rental.findById(req.params.id);
    
    if(!rental) return res.status(404).send(`The rental with "${req.params.id}" id was not found!`);
    
    res.status(200).send(rental);
});


module.exports = router; // exporting a router