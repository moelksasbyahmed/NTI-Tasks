const add_books = require('./add_books');
const read_books = require('./read_books');
const save_books = require('./save_books'); 
const delete_books = require('./delete_books');
const update_books = require('./update_books');
const get_book_by_id = require('./get_book_by_id');
const json_handler = require('./json_handler'); 
module.exports = {
    add_books , 
    read_books ,
    save_books ,
    delete_books ,
    update_books ,
    get_book_by_id ,
    json_handler
}