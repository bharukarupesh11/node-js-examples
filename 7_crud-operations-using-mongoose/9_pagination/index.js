const mongoose = require('mongoose');

// To remove deprecation warnings given by connect() method below
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Could not connect to MongoDB...', error));


const courseSchema = new mongoose.Schema({
    name: String, 
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); // creates a Course class(model)
/**
     * Below, we've compiled our schema to a model which gives us a class.
     * 
     * Next, we can create an object based on that class and this object maps to 
     * a document in a mongodb database.
     */
    
 const course = new Course({
    name: 'Angular', 
    author: 'Rupesh',
    tags: ['angular', 'frontend'],
    isPublished: true
});


async function createCourse(){
    // Saving above document to a database 
    const result = await course.save();
    console.log(result);
}

async function getAllCourses() {
    const courses = await Course.find(); // to get all the documents
    console.log(courses);
}

async function getCoursesByName() {
    const courses = await Course.find({name: 'Angular'}); // to get only courses with name Angular
    console.log(courses);
}

async function getFilteredCourses() {
    /**
     * Pagination Example:
     * 
     * In real example we get the pageSize and pageNumber in our query
     * string parameter as below,
     * 
     * Eg. /api/courses?pageNumber=2&pageSize=10
     */
    const pageNumber = 2;
    const pageSize = 10;
    
    const courses = await Course
    .find()
    .skip((pageNumber - 1) * pageSize) // assuming that page number starts with 1
    .limit(pageSize)
    .sort({name: 1})
    .select({name: 1, tags: 1});

    console.log(courses);
}


//createCourse();
// getCourses();
// getCoursesByName();
// getFilteredCourses();


