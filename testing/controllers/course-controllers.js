const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '..', 'data', 'courses-data.json');

let courses = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));


const createCourse = (req,res)=>{
    const id = courses[courses.length - 1].id + 1; 
    const newCourse = {
        id , 
        ...req.body
    }
    courses.push(newCourse);
    fs.writeFile(coursesFilePath, JSON.stringify(courses, null , 2),
    (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to write to file'
            })
        }
        else{
 res.status(201).json({
        status: 'success',
        data: {
            course: newCourse
        }
    
    })}
})
}

const getCourseById = (req, res) => {
    const courseId = parseInt(req.params.id);
  
    const course = courses.find(c => c.id === courseId); 
    if (!course) {
     res.status(404).json({
        status: 'error',
        message: 'Course not found'
     })
     return 
    }
    res.status(200).json({
        status: 'success',
        message : 'Course found', 
        data: {
            course
        }
    })

}

const updateCourse = (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        res.status(404).json({
            status : 'error', 
            message : 'Course not found'
        })
    }
   const updatedCourse = Object.assign(course, req.body);
    courses[courseIndex] = updatedCourse;
    fs.writeFile(coursesFilePath, JSON.stringify(courses, null , 2),
    (err)=> {
        if (err){
            res.status(404).json({
                status: 'error',
                message: 'Failed to write to file'

            })
             }
            else{
                res.status(200).json({
                    status: 'success',
                    message: 'Course updated successfully',
                    data: {
                        course: updatedCourse
                    }
                })
            }
            
        })
    }
    const deleteCourse =  (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        res.status(404).json({
            status: 'error',
            message: 'Course not found'
        })
    }
    courses.splice(courseIndex, 1);
    fs.writeFile(coursesFilePath, JSON.stringify(courses, null , 2),
    (err)=> {
        if (err){
            res.status(404).json({
                status: 'error',
                message: 'Failed to write to file'

            })
             }
            else{
                res.status(200).json({
                    status: 'success',
                    message: 'Course deleted successfully',
                    data: {
                        course: null
                    }
                })
            }
            
        
        })


}
const getAllCourses =  (req, res) => {
   res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }

   })
}
module.exports = {
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    getAllCourses
}