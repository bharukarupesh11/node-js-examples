const mongoose = require('mongoose');

// To remove deprecation warnings given by connect() method below
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/mongo-exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Could not connect to MongoDB...', error));


const courseSchema = new mongoose.Schema({
    name: String, 
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('courses', courseSchema); // creates a Course class(model)
/**
     * Below, we've compiled our schema to a model which gives us a class.
     * 
     * Next, we can create an object based on that class and this object maps to 
     * a document in a mongodb database.
     */

const courses = [
    {
      tags: [ 'node', 'backend' ],
      name: 'Node Js',
      author: 'Rupesh',
      isPublished: true,
      price: 10
    },
    {
      tags: [ 'angular', 'frontend' ],
      name: 'Angular',
      author: 'Rupesh',
      isPublished: true,
      price: 15
    },
    {
      tags: [ 'java', 'backend' ],
      name: 'Java',
      author: 'Aashish',
      isPublished: true,
      price: 20
    },
    {
      tags: [ 'react', 'frontend' ],
      name: 'React',
      author: 'Rupesh',
      isPublished: false,
      price: 17
    },
    {
      tags: [ 'python', 'backend' ],
      name: 'Python',
      author: 'Shubh',
      isPublished: true,
      price: 22
    },
    {
      tags: [ 'css', 'frontend' ],
      name: 'CSS',
      author: 'Rupesh',
      isPublished: true,
      price: 12
    },
    {
      tags: [ 'c language', 'backend' ],
      name: 'C Language',
      author: 'Rupesh',
      isPublished: true,
      price: 9
    }
  ];



const course = new Course(courses);


async function createCourse(){
    // Saving above document to a database 
    // const result = await course.save();

    // To save collection of objects Eg. [{obj1}, {obj2}, {obj3}]
    const result = await Course.collection.insertMany(courses);
    console.log(result);
}

async function getAllCourses() {
    const courses = await Course.find(); // to get all the documents
    console.log(courses);
}

async function getAllBackendPublishedCourses() {
    /**
     * To get all the published backend courses, sorted by their name,
     * pick only their name and author
     * and display the result
     * 
     * Note: in a sort() method 1 means ascending order and -1 means descending order
     */
    return await Course
        .find()
        .and({tags:'backend'}, {isPublished: true})
        .sort({name: 1})
        .select({name: 1, author: 1});
}

async function getAllFrontendPublishedCourses(){
    
    /**
     * 1st approach:
        return await Course
            .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
            .sort('-price') // to sort in descending order
            .select('name author price'); // properties to be selected
     */

    // 2nd approach
    return await Course
            .find({isPublished: true})
            .or([ {tags: 'frontend'}, {tags: 'backend'} ])
            .sort('-price') // to sort in descending order
            .select('name author price'); // properties to be selected
    
    
}

async function getAllCoursesAboveFifteenDollar(){
    return await Course
            .find({isPublished: true})
            .or([ 
                {price: {$gte: 15}}, 
                {name: /.*Language.*/i} // Course name must have a language word in it
            ])
            .sort('-price') // to sort in descending order
            .select('name author price'); // properties to be selected
}


async function displayResult(){
    // const result = await getAllBackendPublishedCourses();

    // const result = await getAllFrontendPublishedCourses();
    const result = await getAllCoursesAboveFifteenDollar();
    console.log(result);
}


// createCourse();
// getAllCourses();
displayResult();





