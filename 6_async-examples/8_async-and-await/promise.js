
// Crating a promise object: Here, p is a consumer which will consume the result of promise i.e. either result or error
const p = new Promise(function (resolve, reject){
    /*
        Kick off some async work like accessing a database, calling a web service or start a timer or any kind 
        of async operation. Eventually when that async work completes we should either have a value or error
        The result is returned to the consumer of this promise which is 'p' object here.
    */
   // using a callback to make it more real: So after 2 seconds this async operation is going to produce the result 1
    setTimeout(() => {
        // resolve(1); // pending => resolved, fullfilled
         reject(new Error('Some error occurred')); // pending => rejected
    }, 2000);
});

// Using a consumer object for the result or error 
p
 .then(result => console.log('Result: ', result))
 .catch(error => console.log('Error: ', error.message));



/*
 * Explanation to below Promise constructor function:
 *      Promise(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<any>
 * 
 * So, promise constructor has a function named executor which requires 2 parameters i.e. resolve or reject
 * Now, If we look at both resolve and reject parameters they themselves are  functions.
 * 
 * So, a "resolve(value: any) => void" function requires one parameter i.e. 'value' of any type and after the 
 * fat arrow is a body of resolve function set to 'void'. That means resolve function doesn't have any body.
 * And, that's why in the above example we've only passed parameters to resolve function and did not define 
 * any body for it.
 * 
 * Now, similarly, we've "reject: (reason?: any) => void" function which requires one parameter i.e. 'reason'
 * of any type and after the fat arrow is a body of reject function set to 'void'. That means reject function
 * doesn't have any body. And, that's why in the above example we've only passed parameters to reject function
 * and did not define any body for it.
 * 
 * But, it's important to notice that, a promise constructor function returns an object of type "Promise" as
 * Promise<any>
 */


/**
 * Explanation to the then() function of our consumer object 'p'
 *     then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => PromiseLike<never>): Promise<any>
 * 
 * then() method should be used for the success scenario and catch() for the error.
 * 
 * Here, then() function requires one parameter i.e. 'value' of any type and after fat arrow we've any that means
 * we can have a body of function inside which we will define what we wanna do with the 'value' passed to our
 * then() function.
 * 
 * then() reuturns a Promise object of any type.
 * 
 */


