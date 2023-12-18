//main controller
const conn = require('../utils/database');
const logValid = require('../validators/userValidator');

module.exports.home = function(req,res) {
    logValid.loginValidator(req,res);
    res.render('index', { title: 'Booklover Heaven' });
}

module.exports.myborrowed = function(req,res) {
    //logValid.loginValidator(req,res);
    const sql = "SELECT b.ID, b.ISBN, b.Author, b.Name\
    FROM books b\
    JOIN borrows bor ON b.ID = bor.id_book\
    WHERE bor.id_user = ?;";
    let idUser = parseInt(req.session.userid);
    conn.query(sql, idUser, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('my-borrowed', { title: 'Borrowed books', books : data });
    });
}

module.exports.return = function(req,res) {
    //logValid.loginValidator(req,res);
    let userId = req.session.userid;
    let bookId = req.params.id;
    let sql = "DELETE FROM borrows WHERE id_user=? AND id_book=?";
    conn.query(sql, [userId, bookId], function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect(303,'/borrowed-books');
    });
}

module.exports.mybooks = function(req,res) {
    //logValid.loginValidator(req,res);
    const sql = "SELECT b.ID, b.ISBN, b.Author, b.Name, o.Verified\
    FROM books b\
    JOIN owners o ON b.ID = o.id_book\
    WHERE o.id_user = ?;";
    let idUser = parseInt(req.session.userid);
    conn.query(sql, idUser, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('my-books', { title: 'My books', books : data });
    });
}

module.exports.verify = function(req,res) {
    const sql = "UPDATE owners SET Verified = 1 WHERE id_book=?;";
    let idBook = parseInt(req.params.id);
    conn.query(sql, idBook, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect(303,'/my-books');
    });
}

module.exports.login = function(req,res) {
    res.render('login');
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
                req.session.userid = results[0].ID;
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
    let user = {
        username: req.body.username,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        phone: BigInt(req.body.phone),
        tgName: req.body.tgName,
    }
    console.log(user);
    let sql = "INSERT INTO users (Username, Passw, Email, Age, Phone, telegramName, Name) VALUES (?, ?, ?, ?, ?, ?, ?)";
    return conn.query(sql, [user.username, user.password, user.email, user.age, user.phone, user.tgName, user.name], 
        (err, result) => {
        if (err) throw err;if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/login');
    });
}

module.exports.logout = function(req,res) {
    req.session.loggedin=false;
    res.redirect("/login");
}

