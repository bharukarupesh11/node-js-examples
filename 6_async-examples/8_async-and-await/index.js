
console.log('Before');

// Asynchronous Style of writing - Nested Callback functions 
/*getUser(1, function(user) {
    getRepositories(user.gitHubUsername, function(repositories){
        // get the commits for the given repository
        getCommits(repositories[0], function(commits){
            console.log(commits);
        });
    });
});*/

// Converting above chain of callbacks to a chain of promise consumers
/*getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repositories => getCommits(repositories[0]))
    .then(commits => console.log('Commits: ', commits))
    .catch(error => console.log('Error: ', error)); // if an error occurs for any of the above async operations then that will be catched here
*/

// Replacing promise code with Async and Await approach: Helps us write asynchronous code like synchronous code
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repositories = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repositories[0]);
        console.log(commits);
    } catch(error){
        console.log(error);
    }
}

displayCommits();

console.log('After');


/**
 * Callback/Asynch function to get a user object from database.
 * 
 * @callback getUser
 * 
 * @param {Number} id An id of a user
 * @param {getUserCallback} callback  A callback function that'll be called when the result of an asynchronous operation is ready
 */
/*function getUser(id, callback) {
    setTimeout(() => {
        // To get user object from the database
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'Rupesh'}); // calling callback fun when the result is ready: returns the user object for the provided userid
        // return {id: id, gitHubUsername: 'Rupesh'};
    },2000);
}*/

// Converting above getUser() async function to a promise
function getUser(id) {
    return new Promise(function (resolve, rejected){
        // Kick off some asyc work
        setTimeout(() => {
            // To get user object from the database
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'Rupesh'}); // calling callback fun when the result is ready: returns the user object for the provided userid
            // return {id: id, gitHubUsername: 'Rupesh'};
        },2000);
    });
}



/**
 * Callback/Asynch function to get list of repositories for the given user.
 * 
 * @callback getRepositories
 * 
 * @param {String} username Name of a user
 * @param {getRepositoriesCallback} callback A callback function that'll be called when the result of an asynchronous operation is ready
 */
/*function getRepositories(username, callback) {
    setTimeout(()=> {
        console.log('Calling GitHub API to get Repositories...');
        callback(['Repo1', 'Repo2' ,'Repo3']); // calling callback fun when the result is ready: returns all the repositories under provided username
    }, 2000);
}*/


// Converting above getRepositories() async function to a promise
function getRepositories(username) {
    return new Promise(function(resolve, rejected){
       // Kick off some async operations
        setTimeout(()=> {
            console.log('Calling GitHub API to get Repositories...');
            // resolve(['Repo1', 'Repo2' ,'Repo3']); // calling callback fun when the result is ready: returns all the repositories under provided username
            rejected(new Error('Could not get the repositories...'));
        }, 2000);
    });
}

/**
 * Callback/Asynch function to get list of commits for the given repository.
 * 
 * @callback getCommits
 * 
 * @param {String} repository Name of repository 
 * @param {getCommitsCallback} callback A callback function that'll be called when the result of an asynchronous operation is ready
 */
/*function getCommits(repository, callback){
    setTimeout(()=> {
        console.log('Calling GitHub API to get Commits...');
        callback(['Commit1', 'Commit2' ,'Commit3']); // calling callback fun when the result is ready: returns all the commits under provided repo name
    }, 2000);
}*/

// Converting above getCommits() async function to a promise
function getCommits(repository){
    return new Promise(function(resolve, rejected){
        setTimeout(()=> {
            console.log('Calling GitHub API to get Commits...');
            resolve(['Commit1', 'Commit2' ,'Commit3']); // calling callback fun when the result is ready: returns all the commits under provided repo name
        }, 2000);
    });
}