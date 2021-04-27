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

async function getFilteredCourses() {
    /**
     * To get all the documents with upto 10 properties in it, 
     * sorted by name(in ascending order) and only with 2 properties
     * 
     * Note: If, here we've already specified 2 properties to be selected in a select()
     * function, so we can remove using limit(10) function here.
     */
    const courses = await Course
    .find()
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});

    console.log(courses);
}

async function getCoursesByAuthor() {
    /**
     * Eg. Author Name: 'Rupesh Bharuka'
     * 
     * 1. To get all the courses whose author name starts with Rupesh
     */
    const courses = await Course
    // Starts with Rupesh
    //.find({author: /^Rupesh/ }) // case sensitive

    // Ends with Rupesh
    // .find({author: /Rupesh$/i }) // case in-sensitive

    // Contains Rupesh
    .find({author: /.*Rupesh.*/i }) // .* means zero or more characters before and after Rupesh
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});

    console.log(courses);
}

// getAllCourses();
// getCoursesByName();
// getFilteredCourses();
getCoursesByAuthor();


