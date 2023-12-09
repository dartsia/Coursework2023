var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main');
const userController = require('../controllers/users');
const { loginValidator, registerValidator } = require('../validators/userValidator')
const interceptor = require('../utils/interceptor');

/* GET home page. */
router.get('/', mainController.home);

router.get('/borrowed-books', mainController.about);
router.get('/my-books', mainController.contact);
router.get('/login', mainController.login);//loginValidator, userController.login);//?
router.post('/auth', mainController.authlogin);
router.get('/register', mainController.register);//registerValidator, userController.register);//?
router.get('/forgot-password', mainController.forgotpassword);

module.exports = router;
