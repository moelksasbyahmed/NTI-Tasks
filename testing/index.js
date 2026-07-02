const express = require('express'); 
//const courses_controllers = require('./controllers/course-controllers');

const app = express();
const course_router = require('./routers/courses-router');
app.use(express.json());
app.use('/api/courses', course_router);

        


    

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})