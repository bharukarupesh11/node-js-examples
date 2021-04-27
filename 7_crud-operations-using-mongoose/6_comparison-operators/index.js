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

async function getAllCourses() {
    const courses = await Course.find(); // to get all the documents
    console.log(courses);
}

async function getCoursesByName() {
    const courses = await Course.find({name: 'Angular'}); // to get only courses with name Angular
    console.log(courses);
}

/**
 * To get all the documents with upto 10 properties in it, 
 * sorted by name(in ascending order) and only with 2 properties
 * 
 * Note: If, here we've already specified 2 properties to be selected in a select()
 * function, so we can remove using limit(10) function here.
 */
async function getFilteredCourses() {
    const courses = await Course
    .find()
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});

    console.log(courses);
}

/**
 * 1. To get all the courses that are more than $10 in a price
 * 2. To get courses between $10 and $20 
 * 3. To get courses that are $10 or $15 or $20
 * 
 * Note: Assuming that our document has price property.
 */
async function getFilteredCourses2() {
    const courses = await Course
    // .find({price: {$gt: 10}})
    // .find({price: {$gt: 10, $lte: 20}})
    .find({price: {$in: [10, 15, 20]}})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});

    console.log(courses);
}

getAllCourses();
// getCoursesByName();
// getFilteredCourses();
// getFilteredCourses2();

