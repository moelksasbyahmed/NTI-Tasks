const {writeFile} =require('fs').promises;
const path = require('path'); 
const file_path = path.join(__dirname, '../data/books.json');

async function saveBooks(books){
  try {
    const data = JSON.stringify(books, null, 2 );
    await writeFile(file_path, data, 'utf-8');
    console.log('Books saved successfully.');
  } catch (error) {
    console.error('Error saving books:', error);
  }
}

module.exports = saveBooks;
