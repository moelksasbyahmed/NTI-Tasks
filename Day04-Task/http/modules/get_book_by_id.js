const readBooks = require('./read_books')

async function getBookById(id) {
 try {
     const books = await readBooks()
    const book = books.find(b => b.id === parseInt(id))
    if (!book) {
        throw new Error('Book not found')
    }
    return book
}catch (error) {
    console.error('Error getting book:', error)
    throw error
}
}

module.exports = getBookById
