var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controllers')


//POST /api/books
router.post('/books', mainController.create);

//GET all /api/books
router.get('/books', mainController.readAll);

//GET one /api/books/123
router.get('/books/:id', mainController.readOne);

//PUT api/books/123
router.put('/books/:id', mainController.update);

//DELETE one api/books/123
router.delete('/books/:id', mainController.deleteOne);

//DELETE all api/books/123
router.delete('/books', mainController.deleteAll);


module.exports = router;