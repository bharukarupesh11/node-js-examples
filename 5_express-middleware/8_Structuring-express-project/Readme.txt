Templating Engine:
In all the above examples we've implemented so far we've returned json objects in the response. Sometimes, 
however, we need to return HTML markup to the client and that's where we use templating engine. There are various
templating engines available for express applications but the most popular ones are,
    - Pug
    - Mustache
    - EJS

Each templating engine has a different syntax for generating dynamic html and returning it to the client.

To use the above modules, 
1. we need to install them in our project using below npm command,
    npm i pug

2. Set a view engine to our application i.e. pug in this example

3. Optinally, we can set a view template to return a custom html template to the user

4. Open the browser and hit 'http://localhost:3000' url


