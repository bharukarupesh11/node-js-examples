Parallel Promise:
Sometimes we wanna run few async operations in parallel and when they all complete you wanna do something
after. 

Eg. You may call different api like facebook api and twitter api and when the result of both this async 
operations are ready then you wanna return something to the client. 

Use 'Promise.all()' method.

Check 'parallel-promise-api' file for the example.

==========================================================================================================================================
Replacing callbacks with Prmises:
- Javascript promises are extremely powerful when it comes to dealing with an asynchronous code.

What is promise?
- A promise is an object that holds the eventual result of an asynch operations. So, when an asynch operation
completes it can either result in a value or an error.

A promise basically promises you that it will give you the result of an asynch operation.

This object can be in one of the three states.
1. Initially When we create a promise object, it will be in the pending state.
At this point it will kick up some async operation and when the result are ready the promise can be either
2. Fullfilled/Result State : It means an async operation is completed successfully. So here we're going to 
have a value. 
3. Rejected State: Otherwise, if something went wrong during the execution of that async operation the promise will be in a 'Rejected State'

==========================================================================================================================================
Asynch fashion of writing code:
- Whenever we write code in asynchronous fashion, we end up calling so much annonymous functions as a second
parameter for a function. Then we get the result and as a body of that annonymous function we again call 
other function if there is a dependency. 

So, asynch fashion of code looks difficult to understand and as a option we can change it to a named function
which we also call a synchronous style of writing.
Note: Whenever we pass named function at the place of callback function as a second parameter then we just 
write a name to a named function which is a reference instead of calling a named function itself.
==========================================================================================================================================
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
