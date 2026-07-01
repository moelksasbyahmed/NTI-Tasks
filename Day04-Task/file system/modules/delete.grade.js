const readGrades = require('./read.grades');
const saveGrades = require('./save.grades');

function deleteGrade(idOrName) {
  try {
    const grades = readGrades();
    const isId = !isNaN(idOrName);
    const searchId = parseInt(idOrName);
    
    const index = grades.findIndex(g => 
      isId ? g.id === searchId : g.name.toLowerCase() === idOrName.toLowerCase()
    );
    
    if (index === -1) {
      console.error('Grade not found.');
      return null;
    }
    
    const deleted = grades.splice(index, 1);
    saveGrades(grades);
    console.log(`Grade deleted successfully.`, deleted[0]);
    return deleted[0];
  } catch (error) {
    console.error('Error deleting grade:', error.message);
  }
}

module.exports = deleteGrade;
