Replacing callbacks with named functions
- Whenever we write code in asynchronous fashion, we end up calling so much annonymous functions as a second
parameter for a function. Then we get the result and as a body of that annonymous function we again call 
other function if there is a dependency. 

So, asynch fashion of code looks difficult to understand and as a option we can change it to a named function
which we also call a synchronous style of writing.
Note: Whenever we pass named function at the place of callback function as a second parameter then we just 
write a name to a named function which is a reference instead of calling a named function itself.
=====================================================================
How synchronous code looks like?
- Look at below code which is a synchronous style of writing,
  console.log('Before');
  const user = getUser(1); // get the user for given user id
  const repos = getRepositories(user.gitHubUsername); // get all repositories under the given gitHubUsername
  const commits = getCommits(repos[0]); // get all commits under given repo
  console.log('After');


  How Asynchronous code looks like?
  - Look at below code which is a Asynchronous style of writing,
    console.log('Before');

    getUser(1, function(user) {
        getRepositories(user, function(repositories) {
            getCommits(repositories[0], function(commits) {
                //This style of writing code is Callback Hell
                console.log(commits);
            });
        });
    });

    console.log('After');
