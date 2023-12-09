//books controller

const conn = require('../utils/database');

//const books = require('../models/books')

module.exports.list = function(req,res) {
    //const sql = "SELECT * FROM books;";
    const sql = "SELECT b.*\
    FROM books b\
    LEFT JOIN borrows bo ON b.ID = bo.id_book\
    LEFT JOIN owners o ON b.ID = o.id_book\
    GROUP BY b.ID\
    HAVING COUNT(DISTINCT bo.ID) < COUNT(DISTINCT o.ID_user)";
    conn.query(sql, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(data);
        res.render('books/books-list', { title: 'Booklist', books : data });
        
    });
}

module.exports.details = function(req,res) {
    let id = req.params.id;
    const sql = "SELECT * FROM books WHERE ID = ?;";
    conn.query(sql, id, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if(data.length === 0) {
            res.status(404).send('Book not found');
        }
        res.render('books/books-details', { title: 'Book details', book : data[0], id : data[0].ID });
    });
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
    //books.push(book);
    let sql = "INSERT INTO books (ISBN, Author, Name, Description, PagesAmount, Edition, PublishingHouse) VALUES (?, ?, ?, ?, ?, ?, ?)";
    return conn.query(sql, [book.isbn, book.author, book.name, book.description, book.pages, book.edition, book.publishig_house], 
        (err, result) => {
        if (err) throw err;if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('books/books-add', { title: 'Added' });
    });
}

module.exports.borrowBook = function(req,res) {
    //sql = "SELECT Contact FROM owners WHERE id_book=?";
    const sql = "SELECT u.Phone, u.telegramName\
    FROM users u\
    JOIN owners o ON u.ID = o.id_user\
    WHERE o.id_book = ?;";
    idBook = req.params.id;
    conn.query(sql, idBook, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('books/books-borr-contacts', { title: 'Book contacts', contacts : data });
    });
}


