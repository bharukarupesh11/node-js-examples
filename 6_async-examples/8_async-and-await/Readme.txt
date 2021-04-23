Async and Await Approach:
This approach helps us write asynchronous code like a synchronous code. Look at the code to see this fashion
of writing code.

So, with the help of 'await' operator we can write asynchronous code that looks like synchronous code. 

Note: Whenever you use the 'await' operator in a function, you need to decorate that function with the 'async' 
modifier. So, this is a requirement by Javascript engine that whenever you use await you should have a function
that is decorated with an 'async'.

Eg. async function displayCommits(){
    // await code   
}

Look at the code to understand the writing style of async and await. 

So, basically 'async' and 'await' are built on top of promises. This is a syntactical sugar in the language that
allow us to write asynchronous code that looks synchronous. Internally, when the Javascript engine executes this
code it's going to convert this code in a promise code.

So, even though our code looks synchronous, it doesn't executes synchronously. In other words, when you're 
awaiting the result of a function, you're not really waiting or blocking in a synchronous fashion.

One last thing, in our promise based approach we use catch() method to get any erros. When using async and awaits
we don't have the catch() method. Instead we use, try-catch block for the same.
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
