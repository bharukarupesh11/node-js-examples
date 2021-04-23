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
app.delete('/api/courses/:id', (req, res) => {
    // Accept the course. If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);

    if (!course) {
        return res.status(404).send('The course with the given ID was not found!'); // return the course in response which is not found 
    }

    // Delete the course name
    const indexOfCourse = courses.indexOf(course);
    courses.splice(indexOfCourse, 1); // delete 1 course of the given index

    // Return the response
    res.status(200).send(course);
});


// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));