const { readFileSync } = require('fs');
const path = require('path');

function readGrades() {
  try {
    const filePath = path.join(__dirname, '../data/grades.json');
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading grades:', error.message);
    return [];
  }
}

module.exports = readGrades;
