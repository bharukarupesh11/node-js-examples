const express = require('express');
const router = express.Router(); // returns a router object

// Listens to an event
router.get('/', function(req, res){
    // res.status(200).send(`Congratulations, You've successfully got the response!`);
    res.status(200).render('index', {title: 'My Express App', message: 'Hello'}); // name of view file
});


module.exports = router // exporting a router 