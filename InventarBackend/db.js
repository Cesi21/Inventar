const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inventory.db');

// Ustvari tabelo ce ne obstaja
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    firm TEXT,
    price REAL,
    stock INTEGER
  )
`);

module.exports = db;
