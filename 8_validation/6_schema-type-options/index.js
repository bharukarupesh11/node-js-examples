const mongoose = require('mongoose');

// To remove deprecation warnings given by connect() method below
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/playground')
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
        enum: ['WEB', 'MOBILE', 'NETWORK'],
        uppercase: true,
        // lowercase: true,
        trim: true // to trim the spaces around the string 
    },
    author: String,
    tags: {
        type: Array,

        // Custom validation 
        validate: {
            /**
             * isAsync is deprecated. Visit the link below for new approach.
             * https://mongoosejs.com/docs/validation.html#async-custom-validators
             * 
             * New approach says, instead of returning a callback, return a promise
             * */
            isAsync: true,
            validator: function(value, callback) {
                setTimeout(() => {
                    // Do some async work like db operation etc. 
                    const result = value && value.length > 0; 
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10, // minimum price value
        max: 200, // maximum price value
        // custom getter and setter to round the values
        get: value => Math.round(value),
        set: value => Math.round(value)
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
        name: 'Python', 
        price: 25.7, // custom validator will be called while setting the property
        category: 'web',
        author: 'Amit',
        tags: ['backend'], // OR tags: [] 
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

async function getCourseById(id) {
    const courses = await Course
                            .find({_id: id})
                            .sort({name: 1})
                            .select('name author price'); // to get all the documents

    /**
     * custom validation getter will be called while accessing 
     * the property price explicitely.
     * 
     * Note: Change the datatype to double and set the value to some floating
     * point number in Databaes to test the getter method
     */
    console.log(courses[0].price); 
}


// createCourse();
// getAllCourses();
getCourseById('6087ea5cfef1f73890e5d2b6'); 
//getCountOfCoursesInDB();
// getCoursesByName();