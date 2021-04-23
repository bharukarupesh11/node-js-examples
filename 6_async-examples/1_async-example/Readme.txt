1. synchronous Flow: In this example if we had written only below 2 lines of code then that would have become a synchronous flow
of execution,
    console.log('First line);
    console.log('Second line);

2. Async Flow: But, in javascript/node we've most of the methods that behaves asynchronously as below,
    console.log('First line);

    setTimeout(() => {
        // some database operations
        console.log('Connecting to a database');
    }, 2000);

    console.log('Second line);

    In this, second example our thread takes a first request and immediately executes it because of synchronouse
    nature of console.log() function. Then it comes to a setTimeout() method which requires some time to execute 
    it's task, so our thread schedules the task to be performed in the future. It doesn't wait, it doesn't block. 
    It just schedules a task and then the control is returned to the next line. 

    Then we get to a 3rd line which is again a console.log() line and display the 'Second Line' message on a console.

    That's why when we run a program first we see First Line and immediately we see Second Line and 2 seconds 
    later when the setTimeout function body is executed we see Connecting to a database. 

    
Note: Async doesn't mean concurrent or muti-threaded. In this example, we've a single thread. So our single 
thread first executes the first line then it schedules the function to be called in 2 seconds. Next it 
executes the other console statement and after that it will be free so in 2 seconds from now it will executes
setTimeout function and display the message 'Connecting to a database'.