const Person = require('./person');

class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        this.grades.push({ studentName, grade });
    }

    listGrades() {
        return this.grades;
    }

    describeRole() {
        return `${this.name} teaches ${this.subject}`;
    }
}

module.exports = Teacher;
