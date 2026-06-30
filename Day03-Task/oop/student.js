const Person = require('./person');

class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.subjects = [];
    }

    enroll(subject) {
        this.subjects.push(subject);
    }

    viewSubjects() {
        return this.subjects;
    }

    describeRole() {
        return `${this.name} is a student`;
    }
}

module.exports = Student;
