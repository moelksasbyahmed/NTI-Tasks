const readBooks = require('./read_books')
const saveBooks = require('./save_books')

async function updateBook(id, updates) {
 try{  
     const books = await readBooks()
    const bookIndex = books.findIndex(book => book.id === id)
    if (bookIndex === -1) {
        throw new Error('Book not found')
    }
    
    Object.keys(updates).forEach(key => {
        if (key in books[bookIndex]) {
            books[bookIndex][key] = updates[key]
        }
    })
    
    await saveBooks(books)
    console.log('Book updated successfully')
    return books[bookIndex]
}catch (error) {
    console.error('Error updating book:', error)
    throw error
}
}
module.exports = updateBook