var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main');
const userController = require('../controllers/users');
const { loginValidator, registerValidator } = require('../validators/userValidator')
const interceptor = require('../utils/interceptor');

/* GET home page. */
router.get('/', mainController.home);

router.get('/borrowed-books', mainController.myborrowed);
// router.get('/return/:id', mainController.returnConfirm);
router.delete('/return/:id', mainController.return);
router.get('/my-books', mainController.mybooks);
router.put('/verify-book/:id', mainController.verify);
router.get('/login', mainController.login);
router.post('/auth', mainController.authlogin);
router.get('/register', mainController.registerform);
router.post('/register', mainController.register);
router.get('/logout', mainController.logout);

module.exports = router;
