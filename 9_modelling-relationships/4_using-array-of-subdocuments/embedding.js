const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    // author: authorSchema // or to add validation use below syntax
    authors: [authorSchema]
}));


async function createCourse(name, authors){
    const course = new Course({
        /** if the name of key and value both are exactly same then there's no need write both of them. 
         *  here, the name of key and value(parameter) both are exactly same. */ 
        name, 
        authors: authors // this is also fine
    });

    const result = await course.save();
    console.log(result);
}

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author); // calling push method of an array as authors property is set to be array of objects
    const result = await course.save();
    console.log(result);
}

async function listCourses(){
    const courses = await Course.find().select('name');
    console.log(courses);
}

async function updateAuthor(courseId) {
    /** 1st approach 
     *  const course = await Course.findById(courseId);
        course.author.name = 'Amit Agrawal'; // updating an object in memory 
        const result = await course.save(); // explicitely calling save method
        console.log(result); */
    
    /** 2nd approach - Directly updating author document in database instead of updating an object in memory 
     *                 and then saving it explicitely as written above*/
    const course = await Course.update({_id: courseId}, {
        $set: {
            'author.name': 'John Smith'
        }
    });

    console.log(course);
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = await course.authors.id(authorId);
    author.remove();
    course.save();
    console.log(course);
}

createCourse('Node Course', [
    new Author({name: 'Rupesh'}),
    new Author({name: 'John Smith'})
]);

// addAuthor('608a98ce79ac1a01b4e283e0', new Author({name: 'Prabhu Das'}));
// removeAuthor('608a98ce79ac1a01b4e283e0', '608a98ce79ac1a01b4e283de');
// updateAuthor('608a92c3929bcb41c0741bf0');
// listCourses();