const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author' // name of a target collection
    }
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name, 
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author){
    const course = new Course({
        /** if the name of key and value both are exactly same then there's no need write both of them. 
         *  here, the name of key and value(parameter) both are exactly same. */ 
        name, 
        author: author // this is also fine
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses(){
    const courses = await Course.find().select('name');
    console.log(courses);
}

// createAuthor('Amit', 'Amits bio', 'Amits Website');

// createCourse('Java Course', '608a885bee130118403140bb');

// listCourses();