const readGrades = require('./read.grades');
const saveGrades = require('./save.grades');

function updateGrade(id, name, subject, grade) {
  try {
    const grades = readGrades();
    const index = grades.findIndex(g => g.id === parseInt(id));
    
    if (index === -1) {
      console.error('Grade not found.');
      return null;
    }
    
    grades[index] = {
      id: parseInt(id),
      name,
      subject,
      grade: parseInt(grade)
    };
    
    saveGrades(grades);
    console.log(`Grade with ID ${id} updated successfully.`);
    return grades[index];
  } catch (error) {
    console.error('Error updating grade:', error.message);
  }
}

module.exports = updateGrade;
