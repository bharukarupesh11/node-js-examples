
console.log('Before');


/**
 * Callback Function Example: When the result of an asynchronous operation is ready this callback function will
 *                            be called with a user object. 
 * 
 * Refer example 2_async-patterns to read the explanation.
 */ 
getUser(1, function(user) {
    console.log('User:', user);

    //  Get the repositories for the below username
    getRepositories(user.gitHubUsername, (repositories) =>{
        console.log('Repositories:', repositories);
    });
});

// const user = getUser(123); // No longer required
// console.log(user); // No longer required

console.log('After');


/**
 * Callback function to get a user object from database.
 * 
 * @callback getUser
 * 
 * @param {Number} id An id of a user
 * @param {getUserCallback} callback  A callback function that'll be called when the result of an asynchronous operation is ready
 */
function getUser(id, callback) {
    setTimeout(() => {
        // To get user object from the database
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'Rupesh'}); // calling callback fun when the result is ready
        // return {id: id, gitHubUsername: 'Rupesh'};
    },2000);
}

/**
 * Callback function to get list of repositories for the given user.
 * 
 * @callback getRepositories
 * 
 * @param {String} username Name of a user
 * @param {getRepositoriesCallback} callback A callback function that'll be called when the result of an asynchronous operation is ready
 */
function getRepositories(username, callback) {
    setTimeout(()=> {
        console.log('Calling GitHub API to get Repositories...');
        callback(['Repo1', 'Repo2' ,'Repo3']);
    }, 2000);
}