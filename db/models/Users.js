const db = require('../db');

class User {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async create(email, passwordHash, role) {
    const result = await db.query(`
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [email, passwordHash, role]);
    return result.rows[0];
  }
}

module.exports = User;