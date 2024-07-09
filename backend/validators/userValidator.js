//const { body } = require('express-validator');

// exports.registerValidator = [
//     body('email')
//         .isEmail().withMessage('Invalid email')
//         .normalizeEmail(),
//     body('password')
//         .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ];

exports.loginValidator = function(req,res) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    }
}
// exports.loginVolidator = [
//     body('email')
//         .isEmail().withMessage('Invalid email')
//         .normalizeEmail(),
//     body('password')
//         .isLength({ min: 6 }).withMessage('Invalid password'),
// ]