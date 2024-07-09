pool = require("../utils/database");

module.exports = {
  async read(username) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT ID,Username,Email,Age FROM users WHERE Username = ?";
      const rows = await conn.query(sql, username);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  async list() {
    try {
      conn = await pool.getConnection();
      sql = "SELECT ID,Username,Email,Age FROM users";
      const rows = await conn.query(sql);
      conn.end();
      return rows;
    } catch (err) {
      throw err;
    }
  },

  async areValidCredentials(username, password) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT Passw FROM users WHERE Username = ?";
      const rows = await conn.query(sql, username);
      conn.end();

      if (rows.length == 1 && rows[0].pass === password) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  async getUserByEmail(email) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT ID,Username,Email,Age FROM users WHERE Email = ?";
      const rows = await conn.query(sql, email);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  async createUser(email, password) {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO users (Email,Password) VALUES (?, ?)";
      const rows = await conn.query(sql, email, password);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
}; 