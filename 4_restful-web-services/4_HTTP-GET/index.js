
const express = require('express'); // returns a function
const app = express(); // calling a function to get the object of type 'Express'

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
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send('Sorry, the requested course is not found!');
    
    res.status(200).send(course);
});


// Configuring server port
const port = process.env.PORT || 3000;

// Raise an event
app.listen(port, () => console.log(`Listening on port ${port}....`));