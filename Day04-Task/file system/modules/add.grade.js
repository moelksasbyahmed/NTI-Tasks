const readGrades = require('./read.grades');
const saveGrades = require('./save.grades');

function addGrade(name, subject, grade) {
  try {
    const grades = readGrades();
    const newId = grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1;
    const newRecord = {
      id: newId,
      name,
      subject,
      grade: parseInt(grade)
    };
    grades.push(newRecord);
    saveGrades(grades);
    console.log(`Grade added successfully. ID: ${newId}`);
    return newRecord;
  } catch (error) {
    console.error('Error adding grade:', error.message);
  }
}

module.exports = addGrade;
