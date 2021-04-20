
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total System Memory(In Bytes): ${totalMemory}`); // used template string
console.log(`Free System Memory(In Bytes): ${freeMemory}`); // used template string

