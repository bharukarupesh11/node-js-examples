const mongoose = require('mongoose');

// To remove deprecation warnings given by connect() method below
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/mongo-exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Could not connect to MongoDB...', error));


const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5, 
        maxlength: 255,
        //match: /pattern/
    }, 
    category: {
        type: String, 
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [ String ],
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10, // minimum price value
        max: 200 // maximum price value
    } // price is required only if the course is published. Note: fat arrow can't be used here
});

const Course = mongoose.model('Course', courseSchema); // creates a Course class(model)


async function createCourse(){
    /**
     * Below, we've compiled our schema to a model which gives us a class.
     * 
     * Next, we can create an object based on that class and this object maps to 
     * a document in a mongodb database.
     */  
    const course = new Course({
        name: 'C++', 
        price: 15,
        category: '-',
        author: 'Aashish',
        tags: ['c++', 'backend'],
        isPublished: true
    });

    try{
        // await course.validate(); // Explicitely calling validate() method. returns promis of type void, so if there's any exception then that will be catched 
        
        // Saving above document to a database 
        const result = await course.save();
        console.log(result);
    }catch(exception){
        // Because we've commented name property above which is set to required in a schema
        console.log(exception.message);
    }
    
}

async function getAllCourses() {
    const courses = await Course.find(); // to get all the documents
    console.log(courses);
}

async function getCoursesByName() {
    const courses = await Course.find({name: 'Angular'}); // to get only courses with name Angular
    console.log(courses);
}


createCourse();
//getAllCourses();
//getCountOfCoursesInDB();
// getCoursesByName();



