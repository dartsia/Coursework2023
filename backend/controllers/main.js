//main controller

module.exports.home = function(req,res) {
    res.render('index', { title: 'Express' });
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

module.exports.register = function(req,res) {
    res.render('register', { title: 'Express' });
}

module.exports.forgotpassword = function(req,res) {
    res.render('forgot-password');
}