const mongoose = require('mongoose');
const course = require('./Database/course');

const PORT = process.env.PORT || 8080;
const mongoURI = 'mongodb://localhost/playground'
const Course = require('./Database/course')

mongoose.connect(mongoURI)
    .then((con) => console.log('connected to MongoDb'))
    .catch(err => console.log('Could not connect Db', err));

async function createCourse() {

    const course = new Course({
        name: "Docker",
        author: 'Mumshad',
        tags: ['node', 'docker', 'mongoose'],
        isPublished: true,
        price: 23.7,
        category: 'web',
    })
    try {
        const result = await course.save()
        console.log(result._doc.name, result._doc.author, result._doc.category, result._doc.price);
    }
    catch (er) {

        console.log('Error while saving ', er);

    }
}


createCourse();

/* Retrieving data from DB */

async function getCourses() {
    const courses = Course.findOne({});
    console.log('start')
    console.log(courses);
    console.log('End')
}
// getCourses();


async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    // course.set({
    //     isPublished : true,
    //    author = 'Another Author'
    // })

    const result = await course.save()
    console.log(result);
}
// updateCourse();

async function directUpdate(id) {
    const result = await Course.update(
        { _id: id },
        {
            $set: {
                author: 'Mohsin Naugat',
                isPublished: false,
            }
        })
    console.log(result);
}
// directUpdate();






course.find({ _id: '61b9de43c7ae4f247ccdfb0b' }).then(data => {
    console.log(data);
})

course.find({ author: /^Abuzar/ }) // For Starts with

course.find({ author: /Hamedani$/i }) // Append i for case insensitivity

course.find({ author: /.*ab.*/i })  // Contains Pattern

course.find({}).count()

// course.find({ author: "abuzar" })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });