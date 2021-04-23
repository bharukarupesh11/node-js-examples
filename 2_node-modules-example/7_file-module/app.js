const fs = require('fs');


// const files = fs.readdirSync('./'); // Synchronous Method: returns a string array of all the files in current folder
// console.log(files);

// replace path with some other value and error will be thrown
fs.readdir('./', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});