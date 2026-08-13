const { createClient } = require('@libsql/client');

// This file is dedicated to creating and exporting the database connection.
// Built lazily (not at require-time) so the server still boots even before
// the Turso env vars are configured.
let client;
function getDb() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

async function ensureFeedbackTable() {
  await getDb().execute(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function ensureOrdersTable() {
  await getDb().execute(`
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
  `);
}

module.exports = { getDb, ensureFeedbackTable, ensureOrdersTable };
