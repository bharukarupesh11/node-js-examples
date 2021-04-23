/**
 * In browser, we've 'document' and 'window' as a global objects available.
 * 
 * However, 'window' is the main Javascript root object, aka the global 
 * object in the browser, also can be treated as the root of the DOM.
 * 
 * In node, we have'global' object available globally.
 * 
 * Note: 
 *    1. When we declare a variables or define a functions(using function declaration) that are 
 *       defined globally can be accessed using 'window' object.
 *       Eg. var message= "";
 *           window.message; // perfect in js
 * 
 *    2. But, in node, the variables and functions are not added to a 
 *       global object 'global'. They are only scoped to the file in which
 *       they are defined. 
 *       So, they're not available outside of that file.
 */


// var message = 'This is a global object';
// console.log(window.message); // okay in javascript

// console.log(global.message); // Will give error: Read point no. 2 above