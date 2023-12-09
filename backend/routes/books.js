var express = require('express');
var router = express.Router();
const bookController = require('../controllers/books')

/* GET booklist. */
router.get('/', bookController.list);

/* GET details page. */
router.get('/info/:id', bookController.details);

/* GET form to add book. */
router.get('/add-book', bookController.addform);

/* POST new book. */
router.post('/add-book', bookController.add);

/* GET borrow book. */ 
router.get('/borrow/:id', bookController.borrowBook);

module.exports = router;