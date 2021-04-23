
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type 'Express'

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
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params); // param is a json object with the parameter name as a key and it's value
});

// Routing Parameter: Find all courses in the given year and month in a sorted order
// Eg. localhost:3000/api/courses/2018/1?sortBy=name
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query); // query parameter
});

// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));