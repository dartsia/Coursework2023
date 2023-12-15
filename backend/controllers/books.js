//books controller

const conn = require('../utils/database');

//const books = require('../models/books')

module.exports.list = function(req,res) {
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
        if(data.length == 0) {
            res.status(404).send('Book not found');
        } else {
            res.render('books/books-details', { title: 'Book details', book : data[0], id : data[0].ID });
        }
    });
}

//Add form
module.exports.addform = function(req,res) {
    res.render('books/books-add-form', { title: 'Add a book' });
}

// function findBookID(ISBN) {
//     let sqlBookId = "SELECT ID FROM books WHERE ISBN LIKE ?";
//     conn.query(sqlBookId, ISBN, (err, result) => {
//         if(err) throw err;
//         console.log(result[0].ID);
//         bookId = parseInt(result[0].ID);
//         return bookId;
//     });
// }

//function to insert an owner
function ownerInsert(ownerId, bookId) {
    let sqlOwner = "INSERT INTO owners (id_book, id_user) VALUES (?, ?);";
    return conn.query(sqlOwner, [bookId, ownerId], (error, result) => {
        if(error) throw error;
        if (error) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    });
}

module.exports.ownerInsert = ownerInsert;

// Actually add a book
module.exports.add = function(req,res) {
    let ownerId = req.session.userid;
    //Create new book object
    let book = {
        //id: id,
        isbn: req.body.isbn,
        author: req.body.author,
        name: req.body.name,
        description: req.body.description,
        pages: req.body.pages,
        edition: req.body.edition,
        publishing_house: req.body.publishing_house,
    }
    let sql = "SELECT ID FROM books WHERE ISBN=?";
    conn.query(sql, book.isbn, (error, result) => {
        if (error) throw error;
		// If the book doesn't exist
        console.log(result.length);
		if (result.length <= 0) {
			let sqlBooks = "INSERT INTO books (ISBN, Author, Name, Description, PagesAmount, Edition,\
                 PublishingHouse) VALUES (?, ?, ?, ?, ?, ?, ?)";
            conn.query(sqlBooks, [book.isbn, book.author, book.name, book.description, book.pages,
                 book.edition, book.publishing_house], (err, result) => {
                if (err) throw err;
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log(result.insertId);
                ownerInsert(ownerId, result.insertId);
            });
		} else {
            ownerInsert(ownerId, result[0].ID);
        }
        
        res.render('books/books-add', { title: 'Added' });
    });
}

module.exports.borrowBook = function(req,res) {
    const sql = "SELECT o.id_book, o.id_user, u.Email, u.Phone, u.telegramName, u.Name\
    FROM users u\
    JOIN owners o ON u.ID = o.id_user\
    WHERE o.id_book = ?;";
    idBook = req.params.id;
    conn.query(sql, idBook, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if(data.length == 0) {
            res.status(404).send('Book not found');
        } else {
            res.render('books/books-borr-contacts', { title: 'Book contacts', contacts : data });
        }
    });
}

module.exports.borrowed = function(req,res) {
    let idBook = parseInt(req.body.inputBookId);
    let idOwner = parseInt(req.body.inputOwnerId);
    let idUser = parseInt(req.session.userid);
    const sql = "INSERT INTO borrows (id_book,id_owner,id_user) VALUES (?, ?, ?)";
    conn.query(sql, [idBook, idOwner, idUser], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/books');
    });
}


