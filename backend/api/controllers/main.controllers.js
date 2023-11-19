let books = require('../models/books.models');

//Util functions

//Check if list is empty
function isEmptyList(obj) {
    return (!obj || obj.length == 0 || Object.keys(obj) == 0);
}

//Check for existing book
function existsBook(id) {
    return books.find( book => book.id == id);
}

//Generate unique book id
function getUniqueId(books) {
    let min = 3;
    let max = 1000;
    do {
        var id = Math.floor(Math.random() * (max-min) + min);
    } while(existsBook(id));
    return id;
}


//POST
//uri: /api/books
module.exports.create = function (req, res) {
    if(isEmptyList(books)) {
        books = [];
    }
    var id = req.body.id;
    if(existsBook(id)){
    //    res.status(400).send("This id already exists");
        id = getUniqueId();
    }

    //var book = req.body; //get new book
    //book.id = id;
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
    res.status(200);
    res.send(book);
}

//GET all
//uri: /api/books
module.exports.readAll = function (req, res) {
    if(isEmptyList(books)) {
        res.status(404).send("List is empty.");
    }
    res.status(200);
    res.send( books );
}

//GET one
//uri: /api/books/123
module.exports.readOne = function (req, res) {
    if(isEmptyList(books)) {
        res.status(404).send("List is empty.");
    }
    let id = req.params.id;
    let book = books.find( book => book.id == id);
    res.status(200);
    res.send(book);
}

//PUT
//uri: /api/books/123
module.exports.update = function (req, res) {
    if(isEmptyList(books)) {
        res.status(404).send("List is empty. Cannot update.");
    }
    let id = req.params.id;
    let book = books.find( book => book.id == id);
    book.isbn = req.body.isbn;
    book.author = req.body.author;
    book.name = req.body.name;
    book.description = req.body.description;
    book.pages = req.body.pages;
    book.edition = req.body.edition;
    book.publishig_house = req.body.publishig_house;

    res.status(200);
    res.send(book);
}

//DELETE one
//uri: /api/books/123
module.exports.deleteOne = function (req, res) {
    if(isEmptyList(books)) {
        res.status(404).send("List is empty. Cannot delete.");
    }
    let id = req.params.id;
    let book = books.find( book => book.id == id);
    let idx = books.indexOf(books.find( book => book.id == id))
    books.splice(idx,1);

    res.status(200); //res.status(404)
    res.send(book);
}

//DELETE all
//uri: /api/books
module.exports.deleteAll = function (req, res) {
    if(isEmptyList(books)) {
        res.status(404).send("List is empty. Cannot delete.");
    }
    books = [];
    res.status(200);
    res.send("All books deleted");
}