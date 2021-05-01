const mongoose = require('mongoose');

// Creating object id 
const id = new mongoose.Types.ObjectId();
console.log("Object Id: ", id); // 24 characters(12 bytes) long string value

// Extracting timestamp from the id
console.log("Timestamp: ", id.getTimestamp());

// Validating object id
const isValid = mongoose.Types.ObjectId.isValid('123'); // passing invalid object id because it's not a 24 char value
console.log("Is Valid Id: ", isValid);