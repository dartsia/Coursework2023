//books controller

const pool = require('../utils/database');

const books = require('../models/books')

module.exports.list = function(req,res) {
    pool.query("SELECT * FROM books;", function(err, results, fields) {
        if(err) throw err;
    
        fs.writeFile('booklist.json', JSON.stringify(results), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    });
    res.render('books/books-list', { title: 'Booklist', books : books });
}

module.exports.details = function(req,res) {
    let id = req.params.id;
    let book = books.find( book => book.id == id);
    res.render('books/books-details', { id : id, title: 'Book details', book : book });
}

//Add form
module.exports.addform = function(req,res) {
    res.render('books/books-add-form', { title: 'Add a book' });
}

// Actually add a book
module.exports.add = function(req,res) {
    let min = 3;
    let max = 1000;
    let id = Math.floor(Math.random() * (max-min) + min);
    //Create new book object
    let book = {
        id: id,
        isbn: req.body.isbn,
        author: req.body.author,
        name: req.body.name,
        description: req.body.description,
        pages: req.body.pages,
        edition: req.body.edition,
        publishig_house: req.body.publishig_house,
    }
    // Add new book to the list
    books.push(book);
    res.render('books/books-add', { title: 'Added' });
}


