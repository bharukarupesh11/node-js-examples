
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


// Raise an event
app.listen(3000, () => console.log(`Listening on port 3000....`));