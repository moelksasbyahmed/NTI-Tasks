const readBooks = require('./read_books') 
const saveBooks = require('./save_books')

async function deleteBook(id, name) {
  
  try {  const books = await readBooks();
    const bookIndex = books.findIndex(book => book.id === id || book.title === name); 
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        await saveBooks(books);
        console.log('Book deleted successfully.');
    } else {
        console.error('Book not found.');
    }
}catch (error) {
    console.error('Error deleting book:', error);
}
}
module.exports = deleteBook;