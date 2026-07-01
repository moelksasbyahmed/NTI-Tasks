
const book_module = require ('./modules')
const http = require('http') 
const url = require('url')
const readBooks = require('./modules/read_books')

const server = http.createServer(async (req , res)=> {
const parsedUrl = url.parse(req.url, true)
const pathname = parsedUrl.pathname
const query = parsedUrl.query

// GET /books - Get all books
if (pathname === '/books' && req.method === 'GET') { 
  
try {    
   const books = await readBooks() 
   book_module.json_handler.success_json_data(res , 200 , books);
    console.log(`Books retrieved successfully. for client ${req.socket.remoteAddress}:${req.socket.remotePort}`); 
}
catch (error) {
    book_module.json_handler.error_json(res , 500 , 'Internal Server Error');
}
return
}

// GET /books/:id - Get a single book by ID
if (pathname.match(/^\/books\/\d+$/) && req.method === 'GET') {
    const id = pathname.split('/')[2]
    try {
        const book = await book_module.get_book_by_id(id)
        book_module.json_handler.success_json_data(res , 200 , book);
        console.log(`Book with ID ${id} retrieved for client ${req.socket.remoteAddress}:${req.socket.remotePort}`);
    }
    catch (error) {
        book_module.json_handler.error_json(res , 404 , 'Book not found');
    }
    return
}


if  (pathname === '/books' && req.method === 'POST') {
    let body = ''; 
 req.on('data' , (chunk)=> {
    body+=chunk  
 })
 req.on('end', async () => {
    let body_json;
 
    try {
       const  body_json = JSON.parse(body);
         var  book = {
        title : body_json.title ,
        author : body_json.author ,
        year : body_json.year ,
        price : body_json.price,
    } 
    } catch (error) {
        book_module.json_handler.error_json(res , 400 , 'Invalid JSON format');
        return
    }

   
    try {
        await book_module.add_books(book.title , book.author , book.year , book.price)
        book_module.json_handler.success_json(res , 201 , 'Book added successfully'); 
    }catch (error) { 
        book_module.json_handler.error_json(res , 500 , `Couldn't add book to the list: ${error.message}`); 
    }
 })
 return
}


if (pathname === '/books' && req.method === 'DELETE') { 
    const book_id = query.id;
    const book_name = query.name;
    console.log(`Deleting book with ID: ${book_id} or name: ${book_name} from client ${req.socket.remoteAddress}:${req.socket.remotePort}`);
    try {
        await book_module.delete_books(parseInt(book_id), book_name) 
        book_module.json_handler.success_json(res , 200 , 'Book deleted successfully');
        console.log(`Book with ID: ${book_id} or name: ${book_name} deleted successfully.`); 
    } catch (error) { 
        console.error(`Error deleting book with ID: ${book_id} or name: ${book_name}:`, error); 
        book_module.json_handler.error_json(res , 404 , 'Book not found'); 
    }
    return
}


if (pathname === '/books' && req.method === 'PUT') {
   
    let body = '';
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', async () => {
        try {
           var  updates = JSON.parse(body)
           // var id = parseInt(updates.id)
          
          
        } catch (error) {
            book_module.json_handler.error_json(res , 400 , 'Invalid JSON format');
            return
        }
        try {
            
            const updatedBook = await book_module.update_books(parseInt(updates.id), updates)
            book_module.json_handler.success_json_data(res , 200 , updatedBook);
            console.log(`Book with ID ${id} updated successfully by client ${req.socket.remoteAddress}:${req.socket.remotePort}`);
        } catch (error) {
            book_module.json_handler.error_json(res , 404 , 'Book not found');
        }
    })
    return
}

res.writeHead(404, {'Content-Type': 'text/plain'})
res.end('Invalid request')

})

server.listen(3000, ()=> {
    console.log('Server is running on port 3000'); 
}
)