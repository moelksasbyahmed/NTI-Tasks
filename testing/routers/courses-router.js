const express = require('express'); 
const courses_controllers = require('../controllers/course-controllers');


const course_router = express.Router();
course_router.route('').get(courses_controllers.getAllCourses)
.post(courses_controllers.createCourse);
course_router.route('/:id').get(courses_controllers.getCourseById)
.patch(courses_controllers.updateCourse)
.delete(courses_controllers.deleteCourse);
module.exports = course_router;