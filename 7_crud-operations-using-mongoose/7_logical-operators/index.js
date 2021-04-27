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


async function getAllCourses() {
    const courses = await Course.find(); // to get all the documents
    console.log(courses);
}

async function getCoursesByName() {
    const courses = await Course.find({name: 'Angular'}); // to get only courses with name Angular
    console.log(courses);
}


/**
 * 1. To get all the courses that are authored by 'Rupesh' or
 * courses that are pulished.
 * 
 * Note: The 'and' logical operator is exactly same
 */
async function getFilteredCourses2() {
    const courses = await Course
        .find()
        .or({author: 'Rupesh'}, {isPublished: true})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});

    console.log(courses);
}

// getCourses();
// getCoursesByName();
getFilteredCourses2();

