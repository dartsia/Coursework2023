//main controller
const usersModel = require("../models/users.models");
const conn = require('../utils/database')

module.exports.home = function(req,res) {
    if (req.session.loggedin) {
        res.render('index', { title: 'Express' });
    } else {
    // Not logged in
        //res.send('Please login to view this page!');
        res.redirect('/login');
    }
    res.end();
}

module.exports.about = function(req,res) {
    res.render('about');
}

module.exports.contact = function(req,res) {
    res.render('contact');
}

module.exports.login = function(req,res) {
    res.render('login');
}

module.exports.loginValid = async function(req,res) {
    areValid = await usersModel.areValidCredentials(req.body.username, req.body.passw);

    if (areValid) {
        user = await model.read(req.body.username);
        await req.login(user, function (err) { });

        if (req.user.role === "ADMIN") {
            res.redirect("/profile/admin");
        } else {
            res.redirect("/profile/user");
        }
    } else {
        res.render("login", {
            errors: [{ msg: "Invalid credentials provided" }],
        });
    }
}

module.exports.authlogin = function(req,res) {
    // Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		conn.query('SELECT * FROM users WHERE Username = ? AND Passw = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
}

module.exports.registerform = function(req,res) {
    res.render('register', { title: 'Express' });
}

module.exports.register = function(req,res) {
    
}

module.exports.forgotpassword = function(req,res) {
    res.render('forgot-password');
}

module.exports.logout = function(req,res) {
    req.logOut();
    res.redirect("/login");
}