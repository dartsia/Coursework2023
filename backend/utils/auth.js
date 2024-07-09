const jwt = require('jsonwebtoken');
const crypto = require('node:crypto')

const SECRET_KEY = crypto.randomBytes(32).toString('hex');

console.log(SECRET_KEY);

function authentificateToken(req,res,next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if(!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if(err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  })
}

module.exports = authentificateToken;
module.exports.key = SECRET_KEY;