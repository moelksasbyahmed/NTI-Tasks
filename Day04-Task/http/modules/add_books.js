const readBooks = require('./read_books')
const saveBooks = require('./save_books')

async function addBooks(title , author , year, price ) { 
if (!title || !author || !year || !price) {
    console.log("author " , author , "title" , title , "year" , year , "price" , price)
    console.error('All fields are required: title, author, year, price'); 
    return ;
}
try {
    const books = await readBooks();
    const newBook = { id : books[books.length-1]?.id ? books[books.length-1].id + 1 : 1, title: title, author: author, year: year, price: price, available: true };
    books.push(newBook);
    await saveBooks(books);
    console.log('Book added successfully.');
}
catch (error) {
    console.error('Error adding book:', error);
}

}
module.exports = addBooks
