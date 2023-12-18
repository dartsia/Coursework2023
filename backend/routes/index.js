var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main');

/* GET home page. */
router.get('/', mainController.home);

router.get('/borrowed-books', mainController.myborrowed);
router.delete('/return/:id', mainController.return);
router.get('/my-books', mainController.mybooks);
router.put('/verify-book/:id', mainController.verify);
router.get('/login', mainController.login);
router.post('/auth', mainController.authlogin);
router.get('/register', mainController.registerform);
router.post('/register', mainController.register);
router.get('/logout', mainController.logout);

module.exports = router;
