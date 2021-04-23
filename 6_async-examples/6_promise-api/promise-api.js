/**
 * Sometimes, you wanna create a promise that is already resolved. This is particular useful while writing a 
 * unit test. So, you wanna simulate a scenario where an async operations like calling a web service completes
 * successfully.
 * 
 * In your unit tests, you wanna create a promise that is already resolved.
 */
const p = Promise.resolve({id: 1}); // So, this is a promise that is already resolved
p.then(result => console.log(result));


/**
 * Sometimes, you wanna create a promise that is already rejected then use reject() method.
 */
const p2 = Promise.reject(new Error('Something has failed...'));
p2.catch(error => console.log(error));