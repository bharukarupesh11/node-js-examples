const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Could not connect to MongoDB...', error));


const courseSchema = new mongoose.Schema({
    name: String, 
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

/**
 * Below, we've compiled our schema to a model which gives us a class.
 * 
 * Next, we can create an object based on that class and this object maps to 
 * a document in a mongodb database.
 */
const Course = mongoose.model('Course', courseSchema); // creates a Course class(model)
const course = new Course({
    name: 'Node Js', 
    author: 'Rupesh',
    tags: ['node', 'backend'],
    isPublished: true
});