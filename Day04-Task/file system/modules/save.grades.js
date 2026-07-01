const { writeFileSync } = require('fs');
const path = require('path');

function saveGrades(grades) {
  try {
    const filePath = path.join(__dirname, '../data/grades.json');
    writeFileSync(filePath, JSON.stringify(grades, null, 2), 'utf-8');
    console.log('Grades saved successfully.');
  } catch (error) {
    console.error('Error saving grades:', error.message);
  }
}

module.exports = saveGrades;
