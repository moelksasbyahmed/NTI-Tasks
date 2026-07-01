const {readFile} =require('fs').promises;
const path = require('path'); 
const file_path = path.join(__dirname, '../data/books.json');

async function readBooks(){
  try {
    const data = await readFile(file_path, 'utf-8');
   
    return JSON.parse(data);
    
  } catch (error) {
    console.error('Error reading books:', error);
  }
}

module.exports = readBooks;
