const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// This file is dedicated to creating and exporting the database connection.
// This prevents circular dependencies.

const db = new sqlite3.Database(path.join(__dirname, 'Database.db'), (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database at:', path.join(__dirname, 'Database.db'));

    // Serialize ensures all queries execute in order
    db.serialize(() => {
        // Create the feedback table if it doesn't exist.
        db.run(`
            CREATE TABLE IF NOT EXISTS feedback (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              message TEXT NOT NULL,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err) => {
            if (err) {
              console.error('Error creating feedback table:', err.message);
            } else {
              console.log('Feedback table ready.');
            }
        });

        // Create the orders table if it doesn't exist (renamed from ordersInfo1 to orders).
        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              customerName TEXT NOT NULL,
              address TEXT NOT NULL,
              phone TEXT NOT NULL,
              paymentMethod TEXT NOT NULL,
              items TEXT NOT NULL,
              totalPrice REAL NOT NULL,
              orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err) => {
            if (err) {
              console.error('Error creating orders table:', err.message);
            } else {
              console.log('Orders table ready.');
            }
        });
    });
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Export the fully initialized database object.
module.exports = db;
