/**
 * Parallel promise example:
 * Sometimes we wanna run few async operations in parallel and when they all complete you wanna do something
 * after. 
 *
 * Eg. You may call different api like facebook api and twitter api and when the result of both this async 
 * operations are ready then you wanna return something to the client. 
 */ 
const promise1 = new Promise(function (resolve, rejected){
    setTimeout(() => {
        console.log('Async Operation 1...');
        resolve(1);
        // rejected(new Error('Error! Something went wrong.'));
    }, 2000);
});

const promise2 = new Promise(function (resolve){
    setTimeout(() => {
        console.log('Async Operation 2...');
        resolve(2);
    }, 2000);
});


// const promise3 = Promise.all([promise1, promise2]);
// promise3.then(result => console.log('Result: ', result));

//OR
Promise.all([promise1, promise2])
    .then(result => console.log('Result: ', result))
    // .catch(error => console.log('Error: ', error.message));

/**
 * Note: First of all, here we don't have real concurrency, we don't have multi-threading. We're still dealing with 
 * the single thread but that single thread is kicking up multiple async operations almost at the same time, 
 * not exactly at the same time. 
 * 
 * First it starts 'Async operations 1...' then the thread is released so immediately after it starts the second async operation 
 * 'Async operations 1...'
 *      We're not waiting for the first async operations result to be ready in order to kick off the second async operation.
 * So in this implementation both the async operations started almost at the same time. 
 * 
 * The other point  is when we get the result, the result will be available as an array for both the promises.
 * 
 * So, what if any one of the promise fails?
 * The answer is, if any one of the promise is rejected/failed the final promise i.e. returned from Promise.all() 
 * is considered rejected.
 * 
 */



 /*Promise.race([promise1, promise2])
 .then(result => console.log('Result: ', result))
  .catch(error => console.log('Error: ', error.message));*/

/**
 * Sometimes, we wanna do some operations as soon as any one of the promise is fullfilled and don't wanna wait
 * for the result of other promise then we use Promise.race() method.
 */
