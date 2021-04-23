const express = require('express');
const router = express.Router(); // returns a router object


const courses = [
    {id: 1, name: 'Java'}, 
    {id: 2, name: 'PHP'}, 
    {id: 3, name: 'Node Js'}
];


/**
 * Note: Just because, we've already mentioned in our index.js about the routes we've removed the duplicated names
 *       from all our route api's below.
 * 
 *       Eg. in our index.js, this line ---> app.use('/api/courses', courses); tell to the express that for all the 
 *           requests that start with the '/api/courses' you will get the route in courses module.
 * 
 *          So, suppose, if user sends a delete request like, "http://localhost:3000/api/courses/1" to delete the
 *          first course, the request will automataically be forwarded to the delete route below with the provided 
 *          course id. 
 */
 router.get('/', (req, res) => {
    res.status(200).send(courses);
});

// Routing Parameter: HTTP Post Request
router.post('/', (req, res) => {
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.status(200).send(course);
});


router.put('/:id', (req, res) => {
    // Accept the course. If not existing, return 404 - Not Found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!'); // return the course in response which is not found 
    
    // Validate: Using 'Object destructuring technique' of javascript instead of 'result.error' technique
    const { error } = validateCourse(req.body); // We've explicitely specified, what we need from the returned object by validation method
    
    if(error) return res.status(400).send(error);
        
    // Updating the course name
    course.name = req.body.name;
    res.status(200).send(course);
});

router.delete('/:id', (req, res) => {
    // Accept the course. If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!'); // return the course in response which is not found 
    
    // Delete the course name
    const indexOfCourse = courses.indexOf(course);
    courses.splice(indexOfCourse, 1); // delete 1 course of the given index

    // Return the response
    res.status(200).send(course);
});

  
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!'); // return the course in response which is not found 

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

module.exports = router; // exporting a router 