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


async function deleteCourse(id) {
    /**
     * Deletes the first document that matches conditions from the collection.
     * 
     * This function has 3 parameters i.e. 
     * filter object, options, callback
     * 
     * Returns the result as total no of deleted document.
     */
    // const result = await Course.deleteOne({_id: id}); 
    // console.log(result);

    // if you wanna get the deleted document as a result use findByIdAndDelete() method
    const course = await Course.findByIdAndDelete({_id: id}); // new true will get the new document which is updated
    console.log(course);
}


// getAllCourses();
deleteCourse('608673519d61d51068317d7a');




