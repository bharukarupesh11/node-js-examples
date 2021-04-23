
console.log('Before');

// Asynchronous Style of writing - Nested Callback functions 
getUser(1, function(user) {
    console.log(user);
    
    getRepositories(user.gitHubUsername, function(repositories){
        console.log(repositories);

        // get the commits for the given repository
        getCommits(repositories[0], function(commits){
            console.log(commits);
        });
    });
});


/* Synchronous Style of writing:
    So, we first call getUser() and when we have the user then we're going to get the repositories for that
    user.

    Now, in the getRepositories(user.gitHubUsername, getCommits); function we pass the user name and when we
    have the repositories then we're gonna get the commits for one of those repositories. 

    Similarly, when we've commits for getCommits(repositories[0], displayCommits); one of the mentioned repository
    we're going to display the commits.

    This is how we can read this synchronous code.
*/ 
//getUser(1, getRepositories); // Note: we've passed reference of a named function as a second parameter which is callback

// const user = getUser(123); // No longer required
// console.log(user); // No longer required

console.log('After');

 
/* Named Functions for Synchronous style of code
   Note: getRepositories(user) function is different than getRepositories(user.gitHubUsername, getCommits); function
         Because the first one required only one parameter and the second one required 2 parameters. Similar for
         all the named functions below.*/
/* function getRepositories(user) {
    //  Get the repositories for the below username
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repositories) {
    getCommits(repositories[0], displayCommits); // to get all the commits under a given repo name
}

function displayCommits(commits) {
    console.log(commits);
}*/


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

/**
 * Callback function to get list of commits for the given repository.
 * 
 * @callback getCommits
 * 
 * @param {String} repository Name of repository 
 * @param {getCommitsCallback} callback A callback function that'll be called when the result of an asynchronous operation is ready
 */
function getCommits(repository, callback){
    setTimeout(()=> {
        console.log('Calling GitHub API to get Commits...');
        callback(['Commit1', 'Commit2' ,'Commit3']);
    }, 2000);
}