var express = require('express');
var router = express.Router();
const pool = require('../utils/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', async function(req, res, next) {
  try {
    const sqlQuery = "SELECT ID, Username, Age, Email FROM users WHERE ID=?";
    const row = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(row)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router;
