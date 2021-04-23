
console.log('First log statement');

const user = getUser(123);

/**
 * Here, 'undefined' will be printed on the screen becasue we won't get a user object immediately from the db.
 * It may take some time like 1 seconds or 2 or whatever.
 * 
 * So how to deal with such situation to make sure we get the data in the above user object before the below
 * console.log(user); is executed
 * 
 * We've 3 Patterns to deal with such situation:
 *   1. Callbacks
 *   2. Promises
 *   3. Async/await : This is a syntactical sugar over promises
 *  */ 
console.log(user);

console.log('Second log statement');


function getUser(id) {
    setTimeout(() => {
        // To get user object from the database
        console.log('Reading a user from a database...');
        return {id: id, gitHubUsername: 'Rupesh'};
    },2000);
}