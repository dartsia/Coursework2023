var express = require('express');
var router = express.Router();
const bookController = require('../controllers/books')

/* GET booklist. */
router.get('/', bookController.list);

/* GET details page. */
router.get('/info/:id', bookController.details);

/* GET form to add book. */
router.get('/books/add-book', bookController.addform);

/* POST new book. */
router.post('books/add-book/:id', bookController.add);

module.exports = router;