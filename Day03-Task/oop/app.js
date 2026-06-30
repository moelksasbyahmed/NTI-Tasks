const Principal = require('./principal');
const Teacher = require('./teacher');
const Student = require('./student');

const members = [];

const principal = new Principal('Ali', 'ali@school.com', 1, members);
const teacher = new Teacher('Sara', 'sara@school.com', 2, 'Math');
const student = new Student('Mona', 'mona@school.com', 3);

principal.addMember(teacher);
principal.addMember(student);

teacher.gradeStudent(student.name, 95);
student.enroll('Math');
student.enroll('English');

console.log('Members:');
members.forEach(member => {
    console.log(member.describeRole());
});

console.log('\nTeacher Grades:');
console.log(teacher.listGrades());

console.log('\nStudent Subjects:');
console.log(student.viewSubjects());
