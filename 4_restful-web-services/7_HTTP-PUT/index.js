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


app.get('/api/courses', (req, res) => {
    res.status(200).send(courses);
});


// Routing Parameter
app.put('/api/courses/:id', (req, res) => {
    // Accept the course. If not existing, return 404 - Not Found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);

    if (!course) {
        return res.status(404).send('The course with the given ID was not found!'); // return the course in response which is not found 
    }

    // Validate
    // const result = validateCourse(req.body);

    // Instead use 'Object destructuring technique' of javascript
    const { error } = validateCourse(req.body); // We've explicitely specified, what we need from the returned object by validation method
    
    if(/*result.error*/ error){
        return res.status(400).send(error);
    }
    
    // Updating the course name
    course.name = req.body.name;
    res.status(200).send(course);
});

function validateCourse(course) {
    // Validate. If invalid, return 400 - Bad Request
    const schema = {
        name: Joi.string().min(3).required()
    };

    const schemaObj = Joi.object(schema); // returns an obj
    return schemaObj.validate(course, schema); // returns a validation object
}


// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));