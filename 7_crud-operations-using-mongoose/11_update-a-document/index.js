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

async function updateCourse1(id){
    /**
    * Approach: Query First
    *    - findById()
    *    - Modify its properties
    *    - save()
    * 
    * Note: Use this approach when we're receiving an input from the client.
    * 
    * Ideally, we shall not update the author of a course which is already
    * published. So, in the below code, we could check something like,
    *       if(course.isPuliblishe) return ;
    */
    const course = await Course.findById(id);    
    console.log(course);
    if(!course) return;

    // course.isPublished = false;
    // course.author = 'Updated Author';

    course.set({
        isPublished: false,
        author: 'New Author'
    });

     const result = await course.save();
     console.log(result);
}

async function updateCourse2(id) {
    /**
     * Approach: Update First (Directly updating a document without checking its presence in the DB)
     *  - Update directly 
     *  - Optionally: get the updated document
     * 
     * Find all the documents matching the given id and update the
     * first document.
     * This function has 4 parameters i.e. 
     * filter object, update object, options, callback
     * 
     * Returns the result as total no of modified document.
     */
    /*const result = await Course.updateOne(
            {_id: id}, {
            $set: {
                name: 'C#', 
                author: 'Aashish Author'
            }
        });
        
        console.log(result); */


    // if you wanna get the document that was updated as a result then use below method
    /*const course = await Course.findByIdAndUpdate(id, {
            $set: {
                name: 'C#', 
                author: 'Amit Author'
            }
        });*/

    
    // if you wanna get the updated document as a result, you need to pass
    // 3rd parameter i.e. option to this method
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            name: 'C++', 
            author: 'Ankit Author'
        }
    }, {new: true}); // new true will get the new document which is updated

    console.log(course);
}


// getAllCourses();
// updateCourse1('60867540250c281924bc52a2');
updateCourse2('60867540250c281924bc52a2');




