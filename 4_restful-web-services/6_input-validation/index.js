const Joi = require('joi'); // Returns a class named 'Joi'
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type 'Express'

// adding a middleware to use this in a request processing pipeline
app.use(express.json());

const courses = [
    {id: 1, name: 'Java'}, 
    {id: 2, name: 'PHP'}, 
    {id: 3, name: 'Node Js'}
];



// Listens to an event
app.get('/', function(req, res){
    // res.status(404).send(`Sorry, Can't find the requested resource!`);
    res.status(200).send(`Congratulations, You've successfully got the response!`);
});

app.get('/api/courses', (req, res) => {
    res.status(200).send(JSON.stringify([
                            {id: 1, name: 'Java'}, 
                            {id: 2, name: 'PHP'}, 
                            {id: 3, name: 'Node Js'}
                        ]));
});

// Routing Parameter
app.post('/api/courses', (req, res) => {
    // Defining a validation schema of course object
    const schema = {
        name: Joi.string().min(3).required()
    };

    const schemaObj = Joi.object(schema); // returns an obj
    const result = schemaObj.validate(req.body, schema); // returns an validation object
    
    console.log(result);
    
    if(result.error){
        // 400 Bad Request
        return res.status(400).send(result.error);
     
    }
    
    // old way of writing input validation
    /**  if(!req.body.name || req.body.name.length < 3) {
        // 400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 character');
        return; // because we don't want the rest of the function to be executed
    }*/

    // Extracting the values of course object that is supplied in rquest body
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(result);
    res.status(200).send(result.value);
});


// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));